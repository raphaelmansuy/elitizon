#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const crypto = require("crypto");
const { chromium } = require("playwright");

function djb2(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return (h >>> 0).toString(16);
}

async function findWoff2() {
  const mediaDir = path.join(process.cwd(), ".next", "static", "media");
  if (!fs.existsSync(mediaDir)) return null;
  const files = fs.readdirSync(mediaDir).filter((f) => f.endsWith(".woff2"));
  if (files.length === 0) return null;
  return path.join(mediaDir, files[0]);
}

async function main() {
  const contentGlob = path.join(process.cwd(), "content", "**/*.mdx");
  const files = glob.sync(contentGlob, { nodir: true });
  if (!files.length) {
    console.log("No MDX files found under content/ — nothing to do.");
    return;
  }

  const outDir = path.join(process.cwd(), "public", "diagrams");
  fs.mkdirSync(outDir, { recursive: true });

  const woff2Path = await findWoff2();
  let woff2Base64 = null;
  if (woff2Path && fs.existsSync(woff2Path)) {
    woff2Base64 = fs.readFileSync(woff2Path).toString("base64");
    console.log("Using woff2 from", woff2Path);
  } else {
    console.warn(
      "No local .woff2 found in .next/static/media — SVGs will not embed Inter font."
    );
  }

  const manifest = {};

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf8");
    const re = /```(?:mermaid)\s*([\s\S]*?)```/g;
    let match;
    let idx = 0;
    const base = path.basename(filePath, path.extname(filePath));
    while ((match = re.exec(content)) !== null) {
      const code = String(match[1]).trim();
      if (!code) continue;
      const hash = djb2(code);
      const filename = `${base}-${hash}.svg`;
      const outPath = path.join(outDir, filename);
      manifest[hash] = filename;

      if (fs.existsSync(outPath)) {
        console.log("Skipping existing", filename);
        idx++;
        continue;
      }

      // Render using a minimal page with mermaid and (optionally) embedded font
      const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
${
  woff2Base64
    ? `@font-face{font-family:InterEmbedded;src:url(data:font/woff2;base64,${woff2Base64}) format('woff2');font-weight:100 900;font-style:normal;font-display:swap;}`
    : ""
}
body{margin:0;padding:0;font-family:InterEmbedded,Inter,system-ui,Arial,sans-serif}
</style>
<script src="https://unpkg.com/mermaid@11/dist/mermaid.min.js"></script>
</head>
<body>
<div id="out"></div>
<script>
  (async()=>{
    try{
      mermaid.initialize({startOnLoad:false,theme:'base',securityLevel:'loose',flowchart:{useMaxWidth:true,htmlLabels:true},themeVariables:{fontFamily:'sans-serif',fontSize:'16px'}});
      const code = ${JSON.stringify(code)};
      const id = 'm'+Math.random().toString(36).slice(2,9);
      const result = await mermaid.render(id, code);
      let svg = '';
      if (typeof result === 'string') svg = result;
      else if (result && typeof result === 'object') svg = result.svg || result.outerHTML || '';
      document.getElementById('out').innerHTML = svg;
      // print outerHTML to console so playwright can grab it
      console.log('SVG-OUT-START');
      console.log(document.getElementById('out').innerHTML);
      console.log('SVG-OUT-END');
    }catch(e){
      console.error('MERMAID_RENDER_ERROR', e && e.message ? e.message : String(e));
    }
  })();
</script>
</body>
</html>`;

      await page.setContent(html, { waitUntil: "networkidle" });

      // Wait for the console message marker
      const svgText = await page.evaluate(() => {
        const el = document.getElementById("out");
        return el ? el.innerHTML : "";
      });

      if (!svgText) {
        console.warn("Empty SVG for", filename);
      } else {
        // Clean up SVG: The mermaid library has TWO issues:
        // 1. Generates SVG with newlines embedded inside attribute values like viewBox="0 0 100 100\n"
        // 2. Generates HTML-style <br> tags inside foreignObject which are invalid XML (need <br/>)
        let cleanedSvg = svgText;

        // Fix 1: Replace newlines that are inside double-quoted attribute values
        cleanedSvg = cleanedSvg.replace(
          /"([^"]*)\n([^"]*)"/g,
          (match, before, after) => {
            let cleaned = before + " " + after;
            while (cleaned.includes("\n")) {
              cleaned = cleaned.replace("\n", " ");
            }
            return '"' + cleaned + '"';
          }
        );

        // Fix 2: Convert HTML-style <br> to XML-style <br/>
        cleanedSvg = cleanedSvg.replace(/<br>/g, "<br/>");

        // Fix 3: Ensure sans-serif fonts by replacing InterEmbedded with sans-serif
        cleanedSvg = cleanedSvg.replace(
          /font-family:InterEmbedded/g,
          "font-family:sans-serif"
        );

        // Normalize multiple spaces to single space
        cleanedSvg = cleanedSvg.replace(/\s{2,}/g, " ");

        fs.writeFileSync(outPath, cleanedSvg, "utf8");
        console.log("Wrote", outPath);
      }

      idx++;
    }
  }

  await browser.close();

  // Write manifest
  const manifestPath = path.join(outDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log("Wrote manifest to", manifestPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

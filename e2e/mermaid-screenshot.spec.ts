import { test } from "@playwright/test";

test("capture autonomy-heartbeat screenshot and console", async ({ page }) => {
  const messages: string[] = [];
  page.on("console", (msg) => messages.push(`${msg.type()}: ${msg.text()}`));

  // Use the port chosen by the dev server; default is 3000 but dev server
  // may switch to another port. Pass base URL via env var if needed.
  const port = process.env.DEV_PORT || "3003";
  const url = `http://localhost:${port}/blog/autonomy-heartbeat`;

  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  // Give client JS time to render Mermaid
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: "tmp/mermaid-autonomy-heartbeat.png",
    fullPage: true,
  });

  // Print console messages so the runner output contains them
  console.log("---PLAYWRIGHT-CONSOLE-LOGS-START---");
  for (const m of messages) console.log(m);
  console.log("---PLAYWRIGHT-CONSOLE-LOGS-END---");

  console.log("SCREENSHOT-SAVED: tmp/mermaid-autonomy-heartbeat.png");
});

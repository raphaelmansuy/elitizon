// Accessibility Testing Configuration for ELITIZON
// This file sets up automated accessibility testing with axe-core

const { AxePuppeteer } = require("@axe-core/puppeteer");
const puppeteer = require("puppeteer");

class AccessibilityTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = "http://localhost:3000";
  }

  async setup() {
    this.browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    this.page = await this.browser.newPage();

    // Set viewport for responsive testing
    await this.page.setViewport({ width: 1200, height: 800 });
  }

  async teardown() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async testPage(url, pageName) {
    console.log(`🔍 Testing ${pageName} accessibility...`);

    try {
      await this.page.goto(`${this.baseUrl}${url}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Wait for dynamic content to load
      await this.page.waitForTimeout(2000);

      // Run axe accessibility tests
      const results = await new AxePuppeteer(this.page)
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();

      this.reportResults(pageName, results);
      return results;
    } catch (error) {
      console.error(`❌ Error testing ${pageName}:`, error.message);
      return { violations: [], passes: [] };
    }
  }

  reportResults(pageName, results) {
    const { violations, passes } = results;

    console.log(`\n📊 ${pageName} Results:`);
    console.log(`✅ Passed: ${passes.length} rules`);
    console.log(`❌ Violations: ${violations.length} issues`);

    if (violations.length > 0) {
      console.log(`\n🚨 Accessibility Issues in ${pageName}:`);
      violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.id}`);
        console.log(`   Impact: ${violation.impact}`);
        console.log(`   Description: ${violation.description}`);
        console.log(`   Help: ${violation.helpUrl}`);
        console.log(`   Elements affected: ${violation.nodes.length}`);

        violation.nodes.slice(0, 3).forEach((node, nodeIndex) => {
          console.log(`   - Element ${nodeIndex + 1}: ${node.target[0]}`);
          if (node.failureSummary) {
            console.log(`     Issue: ${node.failureSummary}`);
          }
        });
      });
    }
  }

  async testColorContrast() {
    console.log("\n🎨 Running Color Contrast Tests...");

    const contrastResults = await this.page.evaluate(() => {
      // Helper function to get computed style
      const getComputedColor = (element) => {
        const style = window.getComputedStyle(element);
        return {
          color: style.color,
          backgroundColor: style.backgroundColor,
        };
      };

      // Test key elements for contrast
      const elementsToTest = [
        { selector: "nav a", name: "Navigation Links" },
        { selector: ".text-primary-900", name: "Primary Text" },
        { selector: ".text-red-700", name: "Error Messages" },
        { selector: "button", name: "Buttons" },
        { selector: "input", name: "Form Inputs" },
      ];

      const results = [];
      elementsToTest.forEach(({ selector, name }) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          const colors = getComputedColor(elements[0]);
          results.push({ name, selector, colors });
        }
      });

      return results;
    });

    console.log("\n📋 Color Analysis:");
    contrastResults.forEach(({ name, colors }) => {
      console.log(`${name}: ${colors.color} on ${colors.backgroundColor}`);
    });
  }

  async testKeyboardNavigation() {
    console.log("\n⌨️  Testing Keyboard Navigation...");

    // Test tab navigation
    const focusableElements = await this.page.evaluate(() => {
      const elements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      return Array.from(elements).map((el) => ({
        tag: el.tagName,
        type: el.type || null,
        id: el.id || null,
        ariaLabel: el.getAttribute("aria-label") || null,
        tabIndex: el.tabIndex,
      }));
    });

    console.log(`Found ${focusableElements.length} focusable elements`);

    // Test skip links
    const skipLinks = await this.page.evaluate(() => {
      const skipLinks = document.querySelectorAll('a[href^="#"]');
      return Array.from(skipLinks).map((link) => ({
        text: link.textContent.trim(),
        href: link.href,
        isVisible: link.offsetParent !== null,
      }));
    });

    console.log(`Skip links found: ${skipLinks.length}`);
    skipLinks.forEach((link) => {
      console.log(`  - "${link.text}" → ${link.href}`);
    });
  }

  async runFullAudit() {
    console.log("🏁 Starting ELITIZON Accessibility Audit\n");
    console.log("=====================================\n");

    await this.setup();

    const pages = [
      { url: "/", name: "Home Page" },
      { url: "/about", name: "About Page" },
      { url: "/services", name: "Services Page" },
      { url: "/contact", name: "Contact Page" },
      { url: "/team", name: "Team Page" },
    ];

    let totalViolations = 0;
    let totalPasses = 0;

    for (const { url, name } of pages) {
      const results = await this.testPage(url, name);
      totalViolations += results.violations?.length || 0;
      totalPasses += results.passes?.length || 0;

      // Test specific features on home page
      if (url === "/") {
        await this.testColorContrast();
        await this.testKeyboardNavigation();
      }
    }

    // Summary
    console.log("\n🎯 AUDIT SUMMARY");
    console.log("=================");
    console.log(`Total Tests Passed: ${totalPasses}`);
    console.log(`Total Violations: ${totalViolations}`);
    console.log(
      `Overall Score: ${totalPasses}/${totalPasses + totalViolations} (${(
        (totalPasses / (totalPasses + totalViolations)) *
        100
      ).toFixed(1)}%)`
    );

    if (totalViolations === 0) {
      console.log("\n🎉 CONGRATULATIONS! All accessibility tests passed!");
    } else {
      console.log("\n⚠️  Please address the violations listed above.");
    }

    await this.teardown();
    return { totalViolations, totalPasses };
  }
}

// Export for use in tests
module.exports = AccessibilityTester;

// Run audit if called directly
if (require.main === module) {
  const tester = new AccessibilityTester();
  tester
    .runFullAudit()
    .then(({ totalViolations }) => {
      process.exit(totalViolations > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error("Audit failed:", error);
      process.exit(1);
    });
}

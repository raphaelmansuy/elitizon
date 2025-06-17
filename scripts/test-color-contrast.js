#!/usr/bin/env node

/**
 * ELITIZON Color Contrast Audit Tool
 * Analyzes color combinations for WCAG compliance
 */

// Color definitions from the Elitizon brand palette
const colors = {
  // Primary Colors (Navy Blue)
  "primary-50": "#f8f9fa",
  "primary-100": "#e9ecef",
  "primary-200": "#dee2e6",
  "primary-300": "#adb5bd",
  "primary-400": "#6c757d",
  "primary-500": "#495057",
  "primary-600": "#343a40",
  "primary-700": "#2a3045", // Main brand navy
  "primary-800": "#1e2329",
  "primary-900": "#171a1f",

  // Secondary Colors (Pink/Red Palette)
  "secondary-50": "#fef7f7",
  "secondary-100": "#fdeaea",
  "secondary-200": "#fbd5d5",
  "secondary-300": "#f8afc8",
  "secondary-400": "#f57d9d",
  "secondary-500": "#ff685d",
  "secondary-600": "#fa3366", // Main brand pink
  "secondary-700": "#d62c57",
  "secondary-800": "#b02448",
  "secondary-900": "#631429",

  // Common colors
  white: "#ffffff",
  black: "#000000",
  "gray-50": "#f9fafb",
  "gray-100": "#f3f4f6",
  "gray-200": "#e5e7eb",
  "gray-300": "#d1d5db",
  "gray-400": "#9ca3af",
  "gray-500": "#6b7280",
  "gray-600": "#4b5563",
  "gray-700": "#374151",
  "gray-800": "#1f2937",
  "gray-900": "#111827",
};

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance
 */
function getLuminance(rgb) {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r =
    rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g =
    gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b =
    bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Get WCAG compliance level
 */
function getWCAGLevel(ratio, isLargeText = false) {
  if (isLargeText) {
    if (ratio >= 4.5) return "AAA";
    if (ratio >= 3.0) return "AA";
    return "FAIL";
  } else {
    if (ratio >= 7.0) return "AAA";
    if (ratio >= 4.5) return "AA";
    return "FAIL";
  }
}

/**
 * Format ratio for display
 */
function formatRatio(ratio) {
  return `${ratio.toFixed(2)}:1`;
}

/**
 * Get color emoji based on compliance level
 */
function getStatusEmoji(level) {
  switch (level) {
    case "AAA":
      return "🟢";
    case "AA":
      return "✅";
    case "FAIL":
      return "❌";
    default:
      return "⚪";
  }
}

/**
 * Analyze color combinations used in the website
 */
function analyzeColorCombinations() {
  console.log("🎨 ELITIZON COLOR CONTRAST AUDIT");
  console.log("=====================================\n");

  // Define color combinations used in the website
  const combinations = [
    // Navigation
    {
      name: "Navigation Text",
      fg: colors["gray-700"],
      bg: colors["white"],
      component: "Navigation",
    },
    {
      name: "Nav Hover State (FIXED)",
      fg: "#be185d",
      bg: colors["secondary-50"],
      component: "Navigation",
    }, // pink-700

    // Hero Section
    {
      name: "Hero Main Text",
      fg: colors["white"],
      bg: colors["primary-800"],
      component: "Hero",
    },
    {
      name: "Hero Pink Accent",
      fg: colors["secondary-400"],
      bg: colors["primary-800"],
      component: "Hero",
    },

    // Services Section - Critical Area
    {
      name: "Service Card Text (FIXED)",
      fg: colors["primary-700"],
      bg: colors["secondary-50"],
      component: "Services",
      critical: true,
    },
    {
      name: "Service Card Text (OLD - FAILING)",
      fg: colors["secondary-400"],
      bg: colors["white"],
      component: "Services",
      critical: true,
      deprecated: true,
    },
    {
      name: "Service Features (FIXED)",
      fg: colors["primary-900"],
      bg: colors["white"],
      component: "Services",
    },

    // About Section
    {
      name: "About Headers",
      fg: colors["primary-700"],
      bg: colors["white"],
      component: "About",
    },
    {
      name: "About Body Text",
      fg: colors["gray-700"],
      bg: colors["white"],
      component: "About",
    },

    // Contact Section
    {
      name: "Form Labels",
      fg: colors["primary-700"],
      bg: colors["white"],
      component: "Contact",
    },
    {
      name: "Form Borders (FIXED)",
      fg: colors["primary-400"],
      bg: colors["white"],
      component: "Contact",
    },
    {
      name: "Error Messages (FIXED)",
      fg: "#b91c1c",
      bg: colors["white"],
      component: "Contact",
    }, // red-700

    // Footer
    {
      name: "Footer Text",
      fg: colors["gray-300"],
      bg: colors["gray-800"],
      component: "Footer",
    },
    {
      name: "Footer Links",
      fg: colors["white"],
      bg: colors["gray-800"],
      component: "Footer",
    },
    {
      name: "Footer Pink Hover",
      fg: colors["secondary-400"],
      bg: colors["gray-800"],
      component: "Footer",
    },

    // Buttons & CTAs
    {
      name: "Primary Button (FIXED)",
      fg: colors["white"],
      bg: "#be185d",
      component: "Buttons",
    }, // pink-700
    {
      name: "Secondary Button",
      fg: colors["primary-700"],
      bg: colors["white"],
      component: "Buttons",
    },
  ];

  // Group by component
  const grouped = combinations.reduce((acc, combo) => {
    if (!acc[combo.component]) acc[combo.component] = [];
    acc[combo.component].push(combo);
    return acc;
  }, {});

  let totalTests = 0;
  let passedAA = 0;
  let passedAAA = 0;
  let critical_failures = 0;

  Object.keys(grouped).forEach((component) => {
    console.log(`📱 ${component.toUpperCase()}`);
    console.log("-".repeat(50));

    grouped[component].forEach((combo) => {
      const ratio = getContrastRatio(combo.fg, combo.bg);
      const level = getWCAGLevel(ratio);
      const emoji = getStatusEmoji(level);
      const status = combo.deprecated ? " (DEPRECATED)" : "";

      totalTests++;
      if (level === "AA" || level === "AAA") passedAA++;
      if (level === "AAA") passedAAA++;
      if (combo.critical && level === "FAIL") critical_failures++;

      console.log(`${emoji} ${combo.name}${status}`);
      console.log(
        `   ${formatRatio(ratio)} - ${level} ${
          combo.critical ? "(CRITICAL)" : ""
        }`
      );
      console.log(`   FG: ${combo.fg} | BG: ${combo.bg}`);

      if (combo.deprecated) {
        console.log("   🚨 This combination should be removed/fixed");
      }

      console.log("");
    });

    console.log("");
  });

  // Summary Report
  console.log("📊 SUMMARY REPORT");
  console.log("==================");
  console.log(`Total Combinations Tested: ${totalTests}`);
  console.log(
    `WCAG AA Compliant: ${passedAA}/${totalTests} (${(
      (passedAA / totalTests) *
      100
    ).toFixed(1)}%)`
  );
  console.log(
    `WCAG AAA Compliant: ${passedAAA}/${totalTests} (${(
      (passedAAA / totalTests) *
      100
    ).toFixed(1)}%)`
  );
  console.log(`Critical Failures: ${critical_failures}`);

  console.log("\n🎯 COMPLIANCE STATUS");
  console.log("====================");
  if (critical_failures > 0) {
    console.log("❌ CRITICAL ISSUES FOUND - Immediate action required");
  } else if (passedAA === totalTests) {
    console.log("✅ WCAG AA COMPLIANT - All combinations pass");
  } else {
    console.log("⚠️  PARTIAL COMPLIANCE - Some combinations need improvement");
  }

  console.log("\n📋 NEXT STEPS");
  console.log("==============");
  console.log("1. Fix all critical failures immediately");
  console.log("2. Improve combinations below AA standard");
  console.log("3. Consider enhancing to AAA where possible");
  console.log("4. Test with actual users and assistive technology");
  console.log("5. Monitor compliance with automated tools");

  console.log("\n🔗 USEFUL RESOURCES");
  console.log("====================");
  console.log(
    "• WCAG Contrast Checker: https://webaim.org/resources/contrastchecker/"
  );
  console.log("• Color Oracle (Color Blindness): https://colororacle.org/");
  console.log("• axe DevTools: https://www.deque.com/axe/devtools/");
  console.log("• WAVE Web Accessibility Evaluator: https://wave.webaim.org/");
}

// Run the analysis
if (require.main === module) {
  analyzeColorCombinations();
}

module.exports = {
  colors,
  getContrastRatio,
  getWCAGLevel,
  analyzeColorCombinations,
};

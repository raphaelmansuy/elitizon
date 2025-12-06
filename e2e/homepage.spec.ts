import { test, expect } from "@playwright/test";

test.describe("Elitizon AI Agent Studio - Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the new hero section with AI Builder Factory messaging", async ({
    page,
  }) => {
    // Check the new headline
    const headline = page.locator("h1");
    await expect(headline).toContainText("Stop Paying for Advice");
    await expect(headline).toContainText("Start Buying Capacity");

    // Check the subheadline mentions AI Builder Factory
    const subheadline = page.locator("section").first().locator("p").first();
    await expect(subheadline).toContainText("AI Builder Factory");
    await expect(subheadline).toContainText("80%");
  });

  test("should display the three key value propositions", async ({ page }) => {
    // Check for the 80% stat
    await expect(page.getByText("80%")).toBeVisible();
    await expect(page.getByText("Work Done by Agents")).toBeVisible();

    // Check for Days stat
    await expect(page.getByText("Days")).toBeVisible();
    await expect(page.getByText("Time-to-Deployment")).toBeVisible();

    // Check for 100% stat
    await expect(page.getByText("100%")).toBeVisible();
    await expect(page.getByText("Outcome Based")).toBeVisible();
  });

  test('should have "Build Your AI Agent" CTA button', async ({ page }) => {
    const ctaButton = page.getByRole("link", { name: /Build Your AI Agent/i });
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute("href", "/contact");
  });

  test('should have "Join Our Expert Grid" button', async ({ page }) => {
    const joinButton = page.getByRole("link", {
      name: /Join Our Expert Grid/i,
    });
    await expect(joinButton).toBeVisible();
    await expect(joinButton).toHaveAttribute("href", "/careers");
  });

  test("should display the three engine cards (Factory, Expert Grid, Day 1 ROI)", async ({
    page,
  }) => {
    await expect(page.getByText("AI Agent Factory")).toBeVisible();
    await expect(page.getByText("Deployed Expert Grid")).toBeVisible();
    await expect(page.getByText("Day 1 ROI")).toBeVisible();
  });
});

test.describe("Elitizon AI Agent Studio - Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display updated navigation items", async ({ page }) => {
    // Check desktop navigation
    const nav = page.locator("nav");

    await expect(nav.getByRole("link", { name: "Factory" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Engineers" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Join Us" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Build Now" })).toBeVisible();
  });

  test('should navigate to Factory (Services) page when clicking "Factory"', async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Factory" }).first().click();
    await expect(page).toHaveURL("/services");
  });

  test('should navigate to Engineers (Team) page when clicking "Engineers"', async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Engineers" }).first().click();
    await expect(page).toHaveURL("/team");
  });
});

test.describe("Elitizon AI Agent Studio - Services Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the Dual Engine Model heading", async ({ page }) => {
    await expect(page.getByText("The Dual Engine Model")).toBeVisible();
  });

  test("should display Engine A: AI Agent Factory", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Engine A: AI Agent Factory" })
    ).toBeVisible();
    await expect(page.getByText("Custom Sales & Support Agents")).toBeVisible();
  });

  test("should display Engine B: Deployed Expert Grid", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Engine B: Deployed Expert Grid" })
    ).toBeVisible();
    await expect(page.getByText("Deployed AI Engineers")).toBeVisible();
  });

  test("should display The Data Foundation service", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "The Data Foundation" })
    ).toBeVisible();
    await expect(page.getByText("Vector Database Setup")).toBeVisible();
    await expect(page.getByText("RAG Pipeline Architecture")).toBeVisible();
  });
});

test.describe("Elitizon AI Agent Studio - Factory Process Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the Inside the AI Factory section", async ({ page }) => {
    await expect(page.getByText("Inside the AI Factory")).toBeVisible();
  });

  test("should display the process steps", async ({ page }) => {
    await expect(page.getByText("1. Data Ingestion")).toBeVisible();
    await expect(page.getByText("2. Vector Database")).toBeVisible();
    await expect(page.getByText("3. AI Agent Core")).toBeVisible();
    await expect(page.getByText("4. API Integration")).toBeVisible();
    await expect(page.getByText("5. Automated Outcome")).toBeVisible();
    await expect(page.getByText("6. Human Oversight")).toBeVisible();
  });
});

test.describe("Elitizon AI Agent Studio - Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the updated contact form heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Ready to Build Your AI Agent/i })
    ).toBeVisible();
  });

  test("should display the updated service dropdown options", async ({
    page,
  }) => {
    const select = page.locator('select[name="service"]');
    await expect(select).toBeVisible();

    // Click to expand and check options
    await expect(select.locator("option")).toHaveCount(5);
    await expect(select.locator('option[value="build-agent"]')).toHaveText(
      "Build an AI Agent (Automation)"
    );
    await expect(select.locator('option[value="deploy-engineers"]')).toHaveText(
      "Hire Deployed Engineers (Implementation)"
    );
    await expect(select.locator('option[value="data-foundation"]')).toHaveText(
      "Build Data Infrastructure (RAG/Vector DB)"
    );
    await expect(select.locator('option[value="strategy"]')).toHaveText(
      "AI Strategy & Audit"
    );
  });
});

test.describe("Elitizon AI Agent Studio - SEO & Metadata", () => {
  test("should have the correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AI Agent Studio|AI Builder Factory/i);
  });

  test("should have the correct meta description", async ({ page }) => {
    await page.goto("/");
    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute("content");
    expect(content).toContain("AI Builder Factory");
  });

  test("should have OpenGraph meta tags", async ({ page }) => {
    await page.goto("/");
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogContent = await ogTitle.getAttribute("content");
    expect(ogContent).toContain("AI Agent Studio");
  });
});

test.describe("Elitizon AI Agent Studio - Accessibility", () => {
  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // There should be exactly one h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // H2 headings should be present
    const h2Count = await page.locator("h2").count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test("should have navigation with proper ARIA labels", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
  });

  test("should have skip navigation links", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });
});

test.describe("Elitizon AI Agent Studio - CTA Sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the Stop Paying for Advice CTA in services section", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", {
        name: /Stop Paying for Advice. Start Buying Capacity/i,
      })
    ).toBeVisible();
  });

  test('should have "Build Your AI Agent" button in CTA section', async ({
    page,
  }) => {
    // There should be multiple Build Your AI Agent links
    const ctaButtons = page.getByRole("link", { name: /Build.*AI Agent/i });
    await expect(ctaButtons.first()).toBeVisible();
  });
});

test.describe("Elitizon AI Agent Studio - Mobile Responsiveness", () => {
  test("should have mobile menu button visible on mobile viewport", async ({
    page,
  }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Mobile menu button should be visible
    const menuButton = page.getByRole("button", { name: /menu/i });
    await expect(menuButton).toBeVisible();
  });

  test("should open mobile menu when clicking hamburger", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Click mobile menu button
    const menuButton = page.getByRole("button", { name: /menu/i });
    await menuButton.click();

    // Check mobile menu items are visible
    await expect(page.getByRole("link", { name: "Factory" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Build Now" })).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

/**
 * Public website pages to monitor.
 *
 * Update this list to match the pages you want to protect.
 * Each page is checked from a visitor's point of view.
 */
const pages = [
  { name: 'Home', url: 'https://www.olapidousacupuncture.com/' },
  { name: 'Services', url: 'https://www.olapidousacupuncture.com/services' },
  { name: 'About', url: 'https://www.olapidousacupuncture.com/about' },
  { name: 'Contact', url: 'https://www.olapidousacupuncture.com/contact' },
];

/**
 * Check that each page loads and shows basic visible content.
 *
 * Why this matters:
 * Some sites do not use h1 headings consistently.
 * This test uses a simpler visitor-level check:
 * the page must load, have a title, and show visible body content.
 */
for (const pageInfo of pages) {
  test(`${pageInfo.name} page loads and shows visible content`, async ({ page }) => {
    await page.goto(pageInfo.url, { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/.+/);

    const body = page.locator('body');
    await expect(body).toBeVisible();

    const bodyText = await body.innerText();
    expect(bodyText.trim().length).toBeGreaterThan(50);
  });
}
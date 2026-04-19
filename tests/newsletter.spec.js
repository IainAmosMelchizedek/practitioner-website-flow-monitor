import { test, expect } from '@playwright/test';

/**
 * Generate a unique test email for each run.
 *
 * This helps avoid duplicate signup behavior
 * affecting the test result.
 */
function generateTestEmail() {
  const timestamp = Date.now();
  return `testuser_${timestamp}@example.com`;
}

/**
 * Newsletter signup test
 *
 * Purpose:
 * - Simulate a real visitor entering an email
 * - Submit the newsletter form
 * - Confirm the visible success state appears
 *
 * Important limitation:
 * This test validates the public-facing signup experience.
 * It does not confirm backend Mailchimp ingestion.
 */
test('newsletter signup shows a thank-you message', async ({ page }) => {
  await page.goto('https://www.olapidousacupuncture.com/', {
    waitUntil: 'domcontentloaded',
  });

  const testEmail = generateTestEmail();

  const emailInput = page.locator('input[type="email"]').first();
  await expect(emailInput).toBeVisible();
  await emailInput.fill(testEmail);

  const signUpButton = page.getByRole('button', { name: /sign up/i });
  await expect(signUpButton).toBeVisible();
  await signUpButton.click();

  const thankYouMessage = page.getByText('Thank you!', { exact: true });
  await expect(thankYouMessage).toBeVisible({ timeout: 10000 });
});
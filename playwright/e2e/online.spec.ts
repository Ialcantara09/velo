import { test, expect } from '../support/fixtures'

test('web app deve estar online', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page).toHaveTitle(/Velô by Papito/)
})

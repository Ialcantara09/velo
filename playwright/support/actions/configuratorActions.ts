import { Page, expect } from '@playwright/test'

export type OptionalName = 'Precision Park' | 'Flux Capacitor'

export function createConfiguratorActions(page: Page) {
  return {
    async open() {
      await page.goto('/configure')
    },

    async selectColor(name: string) {
      await page.getByRole('button', { name }).click()
    },

    async selectWheels(name: string | RegExp){
      await page.getByRole('button', { name }).click()
    },

    async expectPrice(price: string) {
      const priceElement = page.getByTestId('total-price')
        await expect(priceElement).toBeVisible()
        await expect(priceElement).toHaveText(price)
    },

    async expectCarImageSrc(src: string) {
      const carImage = page.locator('img[alt^="Velô Sprint"]')
      await expect(carImage).toHaveAttribute('src', src)
    },

    async setOptional(name: OptionalName, checked: boolean) {
      const checkbox = page.getByRole('checkbox', { name })
      checked ? await checkbox.check() : await checkbox.uncheck()
    },

    async expectOptional(name: OptionalName, checked: boolean) {
      const checkbox = page.getByRole('checkbox', { name })
      checked
        ? await expect(checkbox).toBeChecked()
        : await expect(checkbox).not.toBeChecked()
    },

    async proceedToCheckout() {
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
      await expect(page).toHaveURL(/\/order/)
    },

    async expectCheckoutPrice(price: string) {
      await expect(page.getByTestId('summary-total-price')).toHaveText(price)
    },

  }

}


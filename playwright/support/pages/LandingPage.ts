import { Page, expect } from '@playwright/test'

export class LandingPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/')
    }

    async validateHero() {	
        const title = this.page.getByTestId('hero-section').getByRole('heading')
        await expect(title).toContainText('velô Sprint')
    }
}   
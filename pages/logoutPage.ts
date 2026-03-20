import { Page, Locator } from '@playwright/test'
import BasePage from './basePage'

export class LogoutPage extends BasePage {
    readonly userProfileTrigger: Locator
    readonly logoutMenuItem: Locator
    readonly loginHeading: Locator

    constructor(page: Page) {
        super(page)
        this.userProfileTrigger = page.getByAltText('profile picture')
        this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' })
        this.loginHeading = page.getByRole('heading', { name: 'Login' })
    }

    async openUserMenu(): Promise<void> {
        await this.userProfileTrigger.click()
        await this.logoutMenuItem.waitFor({ state: 'visible' })
    }

    async logout(): Promise<void> {
        await this.openUserMenu()
        await this.logoutMenuItem.click()
    }

    async isLoginPageVisible(): Promise<void> {
        await this.loginHeading.waitFor({ state: 'visible' })
    }
}

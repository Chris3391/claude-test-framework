import { Page, Locator, expect } from '@playwright/test'
import BasePage from './basePage'
import fs from 'fs'
require('dotenv').config()

const BASE_URL = process.env.BASE_URL as string;
const envConfig = JSON.parse(fs.readFileSync('./config/envConfigDetails.json', 'utf8'))

export class LeavePage extends BasePage {
	readonly leaveModuleHeading: Locator
	readonly leaveListHeading: Locator
	readonly applyTab: Locator
	readonly myLeaveTab: Locator
	readonly leaveListTab: Locator
	readonly assignLeaveTab: Locator

	constructor(page: Page) {
		super(page)
		this.leaveModuleHeading = page.getByRole('heading', { name: 'Leave', level: 6 })
		this.leaveListHeading = page.getByRole('heading', { name: 'Leave List', level: 5 })
		this.applyTab = page.getByRole('banner').getByRole('link', { name: 'Apply', exact: true })
		this.myLeaveTab = page.getByRole('banner').getByRole('link', { name: 'My Leave', exact: true })
		this.leaveListTab = page.getByRole('banner').getByRole('link', { name: 'Leave List', exact: true })
		this.assignLeaveTab = page.getByRole('banner').getByRole('link', { name: 'Assign Leave', exact: true })
	}

	async navigateToLeavePage() {
		await super.openUrl(`${BASE_URL}${envConfig.leaveListPath}`)
		await expect(this.leaveListHeading).toBeVisible()
	}

	async navigateToLeaveModule() {
		await super.openUrl(`${BASE_URL}${envConfig.leaveModulePath}`)
		await expect(this.leaveModuleHeading).toBeVisible()
	}

	async clickTab(tabName: string): Promise<void> {
		await this.page.getByRole('banner').getByRole('link', { name: tabName, exact: true }).click()
	}
}

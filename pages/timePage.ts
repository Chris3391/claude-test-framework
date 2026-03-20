import { Page, Locator, expect } from '@playwright/test'
import BasePage from './basePage'
import fs from 'fs'
require('dotenv').config()

const BASE_URL = process.env.BASE_URL as string;
const envConfig = JSON.parse(fs.readFileSync('./config/envConfigDetails.json', 'utf8'))

export class TimePage extends BasePage {
	readonly timeModuleHeading: Locator
	readonly timesheetsHeading: Locator
	readonly timesheetsTab: Locator
	readonly attendanceTab: Locator
	readonly reportsTab: Locator
	readonly projectInfoTab: Locator

	constructor(page: Page) {
		super(page)
		this.timeModuleHeading = page.getByRole('heading', { name: 'Time', exact: true })
		this.timesheetsHeading = page.getByRole('heading', { name: 'Timesheets', exact: true })
		this.timesheetsTab = page.getByRole('banner').getByRole('link', { name: 'Timesheets', exact: true })
		this.attendanceTab = page.getByRole('banner').getByRole('link', { name: 'Attendance', exact: true })
		this.reportsTab = page.getByRole('banner').getByRole('link', { name: 'Reports', exact: true })
		this.projectInfoTab = page.getByRole('banner').getByRole('link', { name: 'Project Info', exact: true })
	}

	async navigateToTimePage() {
		await super.openUrl(`${BASE_URL}${envConfig.timePath}`)
		await expect(this.timeModuleHeading).toBeVisible()
	}

	async clickTab(tabName: string): Promise<void> {
		await this.page.getByRole('banner').getByRole('link', { name: tabName, exact: true }).click()
	}
}

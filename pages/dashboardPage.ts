import { Page, Locator } from '@playwright/test'
import BasePage from './basePage'

export class DashboardPage extends BasePage {
    readonly dashboardHeading: Locator
    readonly sidebarSearchInput: Locator
    readonly userProfileTrigger: Locator
    readonly timeAtWorkWidget: Locator
    readonly myActionsWidget: Locator
    readonly quickLaunchWidget: Locator
    readonly applyLeaveButton: Locator
    readonly noLeaveTypesMessage: Locator
    readonly assignLeaveLink: Locator
    readonly assignLeaveEmployeeInput: Locator
    readonly assignLeaveDateFrom: Locator
    readonly assignLeaveDateTo: Locator
    readonly assignLeaveSubmitButton: Locator
    readonly assignLeaveDialog: Locator

    constructor(page: Page) {
        super(page)
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' })
        this.sidebarSearchInput = page.getByPlaceholder('Search')
        this.userProfileTrigger = page.getByAltText('profile picture')
        this.timeAtWorkWidget = page.getByText('Time at Work', { exact: true })
        this.myActionsWidget = page.getByText('My Actions', { exact: true })
        this.quickLaunchWidget = page.getByText('Quick Launch', { exact: true })
        this.applyLeaveButton = page.getByRole('button', { name: 'Apply Leave' })
        this.noLeaveTypesMessage = page.getByText('No Leave Types with Leave')
        this.assignLeaveLink = page.getByRole('link', { name: 'Assign Leave' })
        this.assignLeaveEmployeeInput = page.getByRole('textbox', { name: 'Type for hints...' })
        this.assignLeaveDateFrom = page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first()
        this.assignLeaveDateTo = page.getByRole('textbox', { name: 'yyyy-dd-mm' }).nth(1)
        this.assignLeaveSubmitButton = page.getByRole('button', { name: 'Assign' })
        this.assignLeaveDialog = page.getByRole('dialog')
    }

    async isDashboardLoaded(): Promise<void> {
        await this.dashboardHeading.waitFor({ state: 'visible' })
    }

    async navigateToModule(moduleName: string): Promise<void> {
        await this.page
            .getByRole('navigation', { name: 'Sidepanel' })
            .getByRole('link', { name: moduleName })
            .click()
    }

    async searchSidebarMenu(term: string): Promise<void> {
        await this.sidebarSearchInput.fill(term)
        await this.page
            .getByRole('navigation', { name: 'Sidepanel' })
            .getByRole('link', { name: term })
            .waitFor({ state: 'visible' })
    }

    async verifyWidgetsVisible(): Promise<void> {
        await this.timeAtWorkWidget.waitFor({ state: 'visible' })
        await this.myActionsWidget.waitFor({ state: 'visible' })
        await this.quickLaunchWidget.waitFor({ state: 'visible' })
    }

    async clickApplyLeave(): Promise<void> {
        await this.applyLeaveButton.click()
    }

    async clickAssignLeave(): Promise<void> {
        await this.assignLeaveLink.click()
    }

    async fillAssignLeaveForm(employeeName: string, leaveType: string, fromDate: string): Promise<void> {
        await this.assignLeaveEmployeeInput.click()
        await this.assignLeaveEmployeeInput.fill(employeeName)
        await this.page.getByRole('option', { name: employeeName }).click()
        await this.page.locator('form i').first().click()
        await this.page.getByRole('option', { name: leaveType }).click()
        await this.assignLeaveDateFrom.fill(fromDate)
        await this.assignLeaveDateTo.click()
    }

    async submitAssignLeave(): Promise<void> {
        await this.assignLeaveSubmitButton.click()
    }
}

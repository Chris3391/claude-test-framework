import { test, expect } from '../../fixtures/uiFixtures'

test.describe('@smoke: Dashboard screen', () => {

	test('Dashboard screen', async ({ loginPage, dashboardPage }) => {
		console.log('Test Start:', new Date().toISOString())

		await test.step('Verify user is redirected to Dashboard after login', async () => {
			await loginPage.openApp()
			await dashboardPage.isDashboardLoaded()
			console.log('on dashboard successfully')
		})

		await test.step('Verify user can apply leave', async () => {
			await dashboardPage.clickApplyLeave()
			await expect(dashboardPage.noLeaveTypesMessage).toBeVisible()
		})

		await test.step('Verify user can assign leave', async () => {
			await dashboardPage.clickAssignLeave()
			await dashboardPage.fillAssignLeaveForm('Ranga Akunuri', 'CAN - Bereavement', '2025-08-01')
			await dashboardPage.submitAssignLeave()
			await expect(dashboardPage.assignLeaveDialog).toContainText(
				'Employee does not have sufficient leave balance for leave request. Click OK to confirm leave assignment.'
			)
		})
	})

})

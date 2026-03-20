import { test, expect } from '../../fixtures/uiFixtures'

test.describe('@smoke: Leave page', () => {

	test('User is redirected to Leave List page', async ({ leavePage }) => {
		await test.step('Navigate to Leave List page and verify heading', async () => {
			await leavePage.navigateToLeavePage()
		})
	})

	test('Leave module loads with correct headings and tabs', async ({ leavePage }) => {
		await test.step('Navigate to Leave module', async () => {
			await leavePage.navigateToLeaveModule()
		})

		await test.step('Verify Leave List page heading is visible', async () => {
			await expect(leavePage.leaveListHeading).toBeVisible()
		})

		await test.step('Verify top navigation tabs are visible', async () => {
			await expect(leavePage.applyTab).toBeVisible()
			await expect(leavePage.myLeaveTab).toBeVisible()
			await expect(leavePage.leaveListTab).toBeVisible()
			await expect(leavePage.assignLeaveTab).toBeVisible()
		})
	})

})

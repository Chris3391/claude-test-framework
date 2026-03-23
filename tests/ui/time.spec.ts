import { test, expect } from '../../fixtures/uiFixtures'

test.describe('@smoke: Time page', () => {

	test('Time module loads with correct headings and tabs', async ({ timePage }) => {
		await test.step('Navigate to Time module', async () => {
			await timePage.navigateToTimePage()
		})

		await test.step('Verify Timesheets page heading is visible', async () => {
			await expect(timePage.timesheetsHeading).toBeVisible()
		})

		await test.step('Verify top navigation tabs are visible', async () => {
			await expect(timePage.timesheetsTab).toBeVisible()
			await expect(timePage.attendanceTab).toBeVisible()
			await expect(timePage.reportsTab).toBeVisible()
			await expect(timePage.projectInfoTab).toBeVisible()
		})
	})

})

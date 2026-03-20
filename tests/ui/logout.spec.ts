import { test } from '../../fixtures/uiFixtures'

test.describe('Logout screen', () => {

	test('Logout', async ({ loginPage, logoutPage }) => {
		console.log('Test Start:', new Date().toISOString())
		await loginPage.openApp()
		await logoutPage.logout()
		await logoutPage.isLoginPageVisible()
		console.log('logged out successfully')
	})

})

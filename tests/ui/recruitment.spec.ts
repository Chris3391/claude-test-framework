import { test, expect } from '../../fixtures/uiFixtures'

test.describe('@smoke: Recruitment page', () => {

	test('Recruitment module loads with correct headings and tabs', async ({ recruitmentPage }) => {
		await test.step('Navigate to Recruitment module', async () => {
			await recruitmentPage.navigateToRecruitmentPage()
		})

		await test.step('Verify Candidates page heading is visible', async () => {
			await expect(recruitmentPage.candidatesHeading).toBeVisible()
		})

		await test.step('Verify top navigation tabs are visible', async () => {
			await expect(recruitmentPage.candidatesTab).toBeVisible()
			await expect(recruitmentPage.vacanciesTab).toBeVisible()
		})
	})

	test('User can switch to Vacancies tab', async ({ recruitmentPage }) => {
		await test.step('Navigate to Recruitment module', async () => {
			await recruitmentPage.navigateToRecruitmentPage()
		})

		await test.step('Click Vacancies tab and verify heading', async () => {
			await recruitmentPage.clickTab('Vacancies')
			await expect(recruitmentPage.vacanciesHeading).toBeVisible()
		})
	})

	test('Candidates table displays all expected column headers', async ({ recruitmentPage }) => {
		await test.step('Navigate to Candidates page', async () => {
			await recruitmentPage.navigateToCandidatesPage()
		})

		await test.step('Verify all column headers are visible', async () => {
			await expect(recruitmentPage.candidatesColVacancy).toBeVisible()
			await expect(recruitmentPage.candidatesColCandidate).toBeVisible()
			await expect(recruitmentPage.candidatesColHiringManager).toBeVisible()
			await expect(recruitmentPage.candidatesColDateOfApplication).toBeVisible()
			await expect(recruitmentPage.candidatesColStatus).toBeVisible()
			await expect(recruitmentPage.candidatesColActions).toBeVisible()
		})
	})

	test('Add Candidate button is visible and navigates to the Add Candidate form', async ({ recruitmentPage }) => {
		await test.step('Navigate to Candidates page', async () => {
			await recruitmentPage.navigateToCandidatesPage()
		})

		await test.step('Verify Add button is visible', async () => {
			await expect(recruitmentPage.addCandidateButton).toBeVisible()
		})

		await test.step('Click Add button and verify navigation to Add Candidate form', async () => {
			await recruitmentPage.clickAddButton()
			await expect(recruitmentPage.page).toHaveURL(/recruitment\/addCandidate/)
		})
	})

	test('Add Candidate form shows required field validation errors on empty submit', async ({ recruitmentPage }) => {
		await test.step('Navigate to Add Candidate form', async () => {
			await recruitmentPage.navigateToAddCandidatePage()
		})

		await test.step('Submit the form without filling in any required fields', async () => {
			await recruitmentPage.clickSaveCandidateForm()
		})

		await test.step('Verify Required validation errors appear for First Name, Last Name, and Email', async () => {
			await expect(recruitmentPage.firstNameRequiredError).toBeVisible()
			await expect(recruitmentPage.lastNameRequiredError).toBeVisible()
			await expect(recruitmentPage.emailRequiredError).toBeVisible()
		})
	})

	test('Vacancies table displays all expected column headers', async ({ recruitmentPage }) => {
		await test.step('Navigate to Vacancies page', async () => {
			await recruitmentPage.navigateToVacanciesPage()
		})

		await test.step('Verify all column headers are visible', async () => {
			await expect(recruitmentPage.vacanciesColVacancy).toBeVisible()
			await expect(recruitmentPage.vacanciesColJobTitle).toBeVisible()
			await expect(recruitmentPage.vacanciesColHiringManager).toBeVisible()
			await expect(recruitmentPage.vacanciesColStatus).toBeVisible()
			await expect(recruitmentPage.vacanciesColActions).toBeVisible()
		})
	})

	test('Add Vacancy button is visible and navigates to the Add Vacancy form', async ({ recruitmentPage }) => {
		await test.step('Navigate to Vacancies page', async () => {
			await recruitmentPage.navigateToVacanciesPage()
		})

		await test.step('Verify Add button is visible', async () => {
			await expect(recruitmentPage.addVacancyButton).toBeVisible()
		})

		await test.step('Click Add button and verify navigation to Add Vacancy form', async () => {
			await recruitmentPage.clickAddVacancyButton()
			await expect(recruitmentPage.page).toHaveURL(/recruitment\/addJobVacancy/)
		})
	})

	test('Add Vacancy form shows required field validation errors on empty submit', async ({ recruitmentPage }) => {
		await test.step('Navigate to Add Vacancy form', async () => {
			await recruitmentPage.navigateToAddVacancyPage()
		})

		await test.step('Submit the form without filling in any required fields', async () => {
			await recruitmentPage.clickSaveVacancyForm()
		})

		await test.step('Verify Required validation errors appear for Vacancy Name, Job Title, and Hiring Manager', async () => {
			await expect(recruitmentPage.vacancyNameRequiredError).toBeVisible()
			await expect(recruitmentPage.jobTitleRequiredError).toBeVisible()
			await expect(recruitmentPage.hiringManagerRequiredError).toBeVisible()
		})
	})

})

test.describe('@regression: Recruitment page', () => {

	test('Candidates search filter panel displays key filter fields', async ({ recruitmentPage }) => {
		await test.step('Navigate to Candidates page', async () => {
			await recruitmentPage.navigateToCandidatesPage()
		})

		await test.step('Verify Candidate Name typeahead input is visible', async () => {
			await expect(recruitmentPage.candidateNameInput).toBeVisible()
		})

		await test.step('Verify Keywords input is visible', async () => {
			await expect(recruitmentPage.candidateKeywordsInput).toBeVisible()
		})
	})

	test('Vacancies search filter panel displays key filter fields', async ({ recruitmentPage }) => {
		await test.step('Navigate to Vacancies page', async () => {
			await recruitmentPage.navigateToVacanciesPage()
		})

		await test.step('Verify Job Title filter dropdown is visible', async () => {
			await expect(recruitmentPage.vacanciesJobTitleDropdown).toBeVisible()
		})

		await test.step('Verify Status filter dropdown is visible', async () => {
			await expect(recruitmentPage.vacanciesStatusDropdown).toBeVisible()
		})
	})

	test('Delete confirmation dialog shows correct content and can be dismissed without deleting', async ({ recruitmentPage }) => {
		await test.step('Navigate to Vacancies page', async () => {
			await recruitmentPage.navigateToVacanciesPage()
		})

		await test.step('Click the delete button on the first row to open the confirmation dialog', async () => {
			await recruitmentPage.clickFirstRowDeleteButton()
		})

		await test.step('Verify confirmation dialog title is correct', async () => {
			await expect(recruitmentPage.deleteConfirmationTitle).toBeVisible()
		})

		await test.step('Verify confirmation dialog body text is correct', async () => {
			await expect(recruitmentPage.deleteConfirmationBody).toBeVisible()
		})

		await test.step('Dismiss the dialog via No, Cancel and verify it closes', async () => {
			await recruitmentPage.dismissDeleteConfirmationDialog()
			await expect(recruitmentPage.deleteConfirmationTitle).not.toBeVisible()
		})
	})

})

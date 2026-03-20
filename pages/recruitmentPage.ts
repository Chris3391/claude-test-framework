import { Page, Locator, expect } from '@playwright/test'
import BasePage from './basePage'
import fs from 'fs'
require('dotenv').config()

const BASE_URL = process.env.BASE_URL as string;
const envConfig = JSON.parse(fs.readFileSync('./config/envConfigDetails.json', 'utf8'))

export class RecruitmentPage extends BasePage {
	// Module-level headings and tabs
	readonly recruitmentModuleHeading: Locator
	readonly candidatesHeading: Locator
	readonly candidatesTab: Locator
	readonly vacanciesTab: Locator
	readonly vacanciesHeading: Locator

	// Candidates table column headers
	readonly candidatesColVacancy: Locator
	readonly candidatesColCandidate: Locator
	readonly candidatesColHiringManager: Locator
	readonly candidatesColDateOfApplication: Locator
	readonly candidatesColStatus: Locator
	readonly candidatesColActions: Locator

	// Candidates page controls
	readonly addCandidateButton: Locator

	// Candidates search/filter panel
	readonly candidateNameInput: Locator
	readonly candidateKeywordsInput: Locator

	// Add Candidate form fields
	readonly addCandidateFirstNameInput: Locator
	readonly addCandidateMiddleNameInput: Locator
	readonly addCandidateLastNameInput: Locator
	readonly addCandidateEmailInput: Locator
	readonly addCandidateSaveButton: Locator

	// Add Candidate form validation messages
	readonly firstNameRequiredError: Locator
	readonly lastNameRequiredError: Locator
	readonly emailRequiredError: Locator

	// Vacancies table column headers
	readonly vacanciesColVacancy: Locator
	readonly vacanciesColJobTitle: Locator
	readonly vacanciesColHiringManager: Locator
	readonly vacanciesColStatus: Locator
	readonly vacanciesColActions: Locator

	// Vacancies page controls
	readonly addVacancyButton: Locator

	// Vacancies search/filter panel
	readonly vacanciesJobTitleDropdown: Locator
	readonly vacanciesStatusDropdown: Locator

	// Add Vacancy form fields
	readonly addVacancyNameInput: Locator
	readonly addVacancySaveButton: Locator

	// Add Vacancy form validation messages
	readonly vacancyNameRequiredError: Locator
	readonly jobTitleRequiredError: Locator
	readonly hiringManagerRequiredError: Locator

	// Delete confirmation dialog
	readonly deleteConfirmationTitle: Locator
	readonly deleteConfirmationBody: Locator
	readonly deleteConfirmCancelButton: Locator
	readonly deleteConfirmDeleteButton: Locator

	// First row delete button (used to trigger delete dialog in regression tests)
	readonly firstRowDeleteButton: Locator

	constructor(page: Page) {
		super(page)

		// Module-level headings and tabs
		this.recruitmentModuleHeading = page.getByRole('heading', { name: 'Recruitment', exact: true })
		this.candidatesHeading = page.getByRole('heading', { name: 'Candidates', level: 5 })
		this.vacanciesHeading = page.getByRole('heading', { name: 'Vacancies', level: 5 })
		this.candidatesTab = page.getByRole('banner').getByRole('link', { name: 'Candidates', exact: true })
		this.vacanciesTab = page.getByRole('banner').getByRole('link', { name: 'Vacancies', exact: true })

		// Candidates table column headers
		this.candidatesColVacancy = page.getByRole('columnheader', { name: 'Vacancy', exact: true })
		this.candidatesColCandidate = page.getByRole('columnheader', { name: 'Candidate', exact: true })
		this.candidatesColHiringManager = page.getByRole('columnheader', { name: 'Hiring Manager', exact: true })
		this.candidatesColDateOfApplication = page.getByRole('columnheader', { name: 'Date of Application', exact: true })
		this.candidatesColStatus = page.getByRole('columnheader', { name: 'Status', exact: true })
		this.candidatesColActions = page.getByRole('columnheader', { name: 'Actions', exact: true })

		// Candidates page controls
		this.addCandidateButton = page.getByRole('button', { name: 'Add', exact: true })

		// Candidates search/filter panel
		this.candidateNameInput = page.getByPlaceholder('Type for hints...')
		this.candidateKeywordsInput = page.locator('input[placeholder="Keywords"]')

		// Add Candidate form fields
		this.addCandidateFirstNameInput = page.locator('input[name="firstName"]')
		this.addCandidateMiddleNameInput = page.locator('input[name="middleName"]')
		this.addCandidateLastNameInput = page.locator('input[name="lastName"]')
		this.addCandidateEmailInput = page.locator('input[placeholder="Type here"]').first()
		this.addCandidateSaveButton = page.getByRole('button', { name: 'Save', exact: true })

		// Add Candidate form validation messages
		this.firstNameRequiredError = page.locator('.oxd-input-group').filter({ hasText: 'First Name' }).locator('.oxd-text--span', { hasText: 'Required' })
		this.lastNameRequiredError = page.locator('.oxd-input-group').filter({ hasText: 'Last Name' }).locator('.oxd-text--span', { hasText: 'Required' })
		this.emailRequiredError = page.locator('.oxd-input-group').filter({ hasText: 'Email' }).locator('.oxd-text--span', { hasText: 'Required' })

		// Vacancies table column headers — use nth(0) on Status/Actions to avoid ambiguity when both tables could be in DOM
		this.vacanciesColVacancy = page.getByRole('columnheader', { name: 'Vacancy', exact: true })
		this.vacanciesColJobTitle = page.getByRole('columnheader', { name: 'Job Title', exact: true })
		this.vacanciesColHiringManager = page.getByRole('columnheader', { name: 'Hiring Manager', exact: true })
		this.vacanciesColStatus = page.getByRole('columnheader', { name: 'Status', exact: true })
		this.vacanciesColActions = page.getByRole('columnheader', { name: 'Actions', exact: true })

		// Vacancies page controls
		this.addVacancyButton = page.getByRole('button', { name: 'Add', exact: true })

		// Vacancies search/filter panel
		this.vacanciesJobTitleDropdown = page.locator('.oxd-select-wrapper').first()
		this.vacanciesStatusDropdown = page.locator('.oxd-select-wrapper').nth(1)

		// Add Vacancy form fields
		this.addVacancyNameInput = page.locator('input[name="name"]')
		this.addVacancySaveButton = page.getByRole('button', { name: 'Save', exact: true })

		// Add Vacancy form validation messages
		this.vacancyNameRequiredError = page.locator('.oxd-input-group').filter({ hasText: 'Vacancy Name' }).locator('.oxd-text--span', { hasText: 'Required' })
		this.jobTitleRequiredError = page.locator('.oxd-input-group').filter({ hasText: 'Job Title' }).locator('.oxd-text--span', { hasText: 'Required' })
		this.hiringManagerRequiredError = page.locator('.oxd-input-group').filter({ hasText: 'Hiring Manager' }).locator('.oxd-text--span', { hasText: 'Required' })

		// Delete confirmation dialog
		this.deleteConfirmationTitle = page.getByRole('heading', { name: 'Are you Sure?' })
		this.deleteConfirmationBody = page.getByText('The selected record will be permanently deleted. Are you sure you want to continue?')
		this.deleteConfirmCancelButton = page.getByRole('button', { name: 'No, Cancel' })
		this.deleteConfirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' })

		// First data row delete icon button
		this.firstRowDeleteButton = page.locator('.oxd-table-body .oxd-table-row').first().getByRole('button').filter({ has: page.locator('i.bi-trash') })
	}

	async navigateToRecruitmentPage() {
		await super.openUrl(`${BASE_URL}${envConfig.recruitmentPath}`)
		await expect(this.recruitmentModuleHeading).toBeVisible()
	}

	async navigateToCandidatesPage() {
		await super.openUrl(`${BASE_URL}${envConfig.viewCandidatesPath}`)
		await expect(this.candidatesHeading).toBeVisible()
	}

	async navigateToVacanciesPage() {
		await super.openUrl(`${BASE_URL}${envConfig.viewVacanciesPath}`)
		await expect(this.vacanciesHeading).toBeVisible()
	}

	async navigateToAddCandidatePage() {
		await super.openUrl(`${BASE_URL}${envConfig.addCandidatePath}`)
		await this.page.waitForLoadState('domcontentloaded')
	}

	async navigateToAddVacancyPage() {
		await super.openUrl(`${BASE_URL}${envConfig.addVacancyPath}`)
		await this.page.waitForLoadState('domcontentloaded')
	}

	async clickTab(tabName: string): Promise<void> {
		await this.page.getByRole('banner').getByRole('link', { name: tabName, exact: true }).click()
	}

	async clickAddButton(): Promise<void> {
		await this.addCandidateButton.click()
	}

	async clickAddVacancyButton(): Promise<void> {
		await this.addVacancyButton.click()
	}

	async clickSaveCandidateForm(): Promise<void> {
		await this.addCandidateSaveButton.click()
	}

	async clickSaveVacancyForm(): Promise<void> {
		await this.addVacancySaveButton.click()
	}

	async clickFirstRowDeleteButton(): Promise<void> {
		await this.firstRowDeleteButton.click()
	}

	async dismissDeleteConfirmationDialog(): Promise<void> {
		await this.deleteConfirmCancelButton.click()
	}
}

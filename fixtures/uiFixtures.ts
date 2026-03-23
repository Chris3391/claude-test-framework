// fixtures.ts
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { test as base , expect, Browser, BrowserContext, Page} from '@playwright/test';
import { LogoutPage } from '../pages/logoutPage';
import { LeavePage } from '../pages/leavePage';
import { TimePage } from '../pages/timePage';
import { RecruitmentPage } from '../pages/recruitmentPage';


export type MyFixtures = {
  browser: Browser;
  page: Page;
  browserContext: BrowserContext;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  logoutPage: LogoutPage;
  leavePage: LeavePage;
  timePage: TimePage;
  recruitmentPage: RecruitmentPage;
};

 const test = base.extend<MyFixtures>({
  browserContext: async ({ browser, contextOptions }, use) => {
    const context = await browser.newContext(contextOptions); // Create a new browser context
    await use(context);
    await context.close();
  },

  page: async ({ browserContext }, use) => {
    const page = await browserContext.newPage(); // Create a single page for the test
    await use(page);
    await page.close();
  },


  loginPage: async ({ page } , use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page } , use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  logoutPage: async ({ page } , use) => {
    const logoutPage = new LogoutPage(page);
    await use(logoutPage);
  },

  leavePage: async ({ page }, use) => {
    const leavePage = new LeavePage(page);
    await use(leavePage);
  },

  timePage: async ({ page }, use) => {
    const timePage = new TimePage(page);
    await use(timePage);
  },

  recruitmentPage: async ({ page }, use) => {
    const recruitmentPage = new RecruitmentPage(page);
    await use(recruitmentPage);
  },


});



export { test, expect };



# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Run UI tests (UAT environment, default)
npm run uitest_uat

# Run UI tests (QA environment)
npm run uitest_qa

# Run API tests
npm run apitest

# Run DB tests
npm run dbtest

# Run a single test file
npx playwright test tests/api/getPet.spec.ts

# Run tests matching a tag (e.g. @smoke)
npx playwright test --grep @smoke

# Lint
npm run lint

# Format
npm run format
```

## Architecture

### Project Structure & Test Layers

Three independent Playwright projects are defined in `playwright.config.ts`:

| Project | Test Dir | Notes |
|---|---|---|
| `E2E Tests` | `tests/ui/` | Depends on `Authentication` project; uses saved session state |
| `API Tests` | `tests/api/` | Targets `https://petstore.swagger.io/v2`; no auth required |
| `DB Tests` | `tests/db/` | Connects to MS SQL Server via `mssql` + `msnodesqlv8` driver |


### UI Test Flow

Authentication is handled as a separate Playwright project (`Authentication` → `E2E Tests` → `teardown`):
1. `tests/ui/authentication.ts` logs in and saves session to `../test-mj/session-storage/.auth/user.json` (the `authFile` export from `playwright.config.ts`)
2. E2E tests reuse that saved `storageState`, skipping login entirely
3. `tests/ui/teardown.ts` runs after all E2E tests

### Page Object Model

- `pages/basePage.ts` — base class for all UI page objects; wraps common Playwright actions (`openUrl`, `waitAndFill`, `waitAndClick`, `isElementVisible`)
- UI page objects (`loginPage`, `dashboardPage`, `logoutPage`) extend `BasePage`
- `pages/apiBasepage.ts` — base class for API helpers; provides `highlightOverrides()` for merging payload overrides
- Fixtures in `fixtures/uiFixtures.ts` and `fixtures/apiFixtures.ts` instantiate page objects and inject them into tests via `test.extend()`
- **Always import `test` and `expect` from the fixture file**, not directly from `@playwright/test`

### Environment Management

- `config/environments.ts` is the `globalSetup`; it loads the correct `.env.*` file based on `NODE_ENV`
- `.env.qa` and `.env.uat` define `BASE_URL`, `Username`, `Password`, and DB credentials
- DB config is in `config/database.ts` and reads all connection details from env vars

### Test Data

- `data/testData.json` — UI assertions (page titles, etc.)
- `data/basePayload.json` — base request body for API POST tests; tests apply overrides on top of it using `apibasePage.highlightOverrides()`

---
name: OrangeHRM locator strategies
description: OrangeHRM-specific locator patterns for validation errors, table rows, delete dialogs, and filter dropdowns — avoids trial-and-error when adding new POM pages
type: project
---

Established locator patterns for OrangeHRM UI elements:

**Validation error messages** — OrangeHRM wraps each form field in `.oxd-input-group`. Filter by `hasText` for the label, then locate `.oxd-text--span` with `hasText: 'Required'`:
```
page.locator('.oxd-input-group').filter({ hasText: 'Field Label' }).locator('.oxd-text--span', { hasText: 'Required' })
```

**Delete confirmation dialog** — title `Are you Sure?`, body contains `The selected record will be permanently deleted...`, buttons are `No, Cancel` and `Yes, Delete` (exact role names).

**Table row delete button** — rows live in `.oxd-table-body .oxd-table-row`; delete icon is `i.bi-trash` inside a `button` role. Use `.first()` to target the first row.

**Filter dropdowns** — use `.oxd-select-wrapper` indexed with `.first()` / `.nth()` within the filter panel context.

**Candidate Name typeahead** — uses `placeholder="Type for hints..."` (shared across multiple typeahead fields in OrangeHRM).

**Pre-existing mssql TS error** — `tests/db/dbTest.spec.ts` has a pre-existing `Cannot find module 'mssql'` error on `tsc --noEmit` because the mssql package is not installed. This is not a regression from new changes.

**Why:** Discovered during Recruitment module expansion — recording to avoid repeating DOM inspection in future POM additions.

**How to apply:** Reference these patterns directly when writing new POMs for OrangeHRM modules rather than guessing locator strategies.

---
name: Recruitment Module Coverage Findings
description: Key coverage gaps and UI structure discovered in the Recruitment module (OrangeHRM) — use when reviewing recruitment-related test work
type: project
---

The Recruitment module has two tabs: Candidates and Vacancies. Current tests only cover navigation and tab visibility. Virtually all functional behaviour is untested.

**Why:** The POM and spec were created as a skeleton — navigation verification only, following the new-POM checklist pattern. No functional tests were written.

**How to apply:** When reviewing or writing recruitment tests, the following areas are known to be uncovered and should be prioritised by risk:

## Discovered UI structure (from live browser inspection 2026-03-19)

### Candidates tab (`/web/index.php/recruitment/viewCandidates`)
- Search/filter panel: Job Title (dropdown), Vacancy (dropdown), Hiring Manager (dropdown), Status (dropdown), Candidate Name (typeahead), Keywords (text), Date of Application From/To (date pickers), Method of Application (dropdown) — none of these filter fields are in the POM
- Table columns: Vacancy, Candidate, Hiring Manager, Date of Application, Status, Actions
- Row actions: View (eye icon), Delete (trash icon), Download resume (download icon — only on some rows)
- Bulk select via checkboxes
- Pagination (73 records found, multiple pages)
- "+Add" button navigates to `/web/index.php/recruitment/addCandidate`

### Add Candidate form (`/web/index.php/recruitment/addCandidate`)
- Required fields: First Name, Last Name, Email
- Optional fields: Middle Name, Vacancy (dropdown), Contact Number, Resume (file upload — accepts .docx .doc .odt .pdf .rtf .txt up to 1MB), Keywords, Date of Application (date picker, defaults to today), Notes, Consent to keep data (checkbox)
- Validation: First Name Required, Last Name Required, Email Required on empty submit

### Candidate detail/edit page (`/web/index.php/recruitment/addCandidate/{id}`)
- "Application Stage" section: shows Name, Vacancy, Hiring Manager, Status, and workflow action buttons
- Workflow stages discovered: Application Initiated → Shortlist (or Reject) → further stages (Interview, Offer Job, Hire) — stage buttons are contextual to current status
- "Reject" and "Shortlist" buttons appear when status is "Application Initiated"
- Each stage transition navigates to a dedicated confirmation form (e.g., `/web/index.php/recruitment/changeCandidateVacancyStatus?candidateId={id}&selectedAction={n}`) with Candidate, Vacancy, Hiring Manager, Current Status (read-only), Notes, Cancel and Save
- "Candidate Profile" section (editable via Edit toggle): Full Name, Job Vacancy, Email, Contact Number, Resume (file), Keywords, Date of Application, Notes, Consent to keep data
- "Candidate History" table: Performed Date, Description, Actions (edit/delete per row)
- Resume download available on candidate profile

### Vacancies tab (`/web/index.php/recruitment/viewJobVacancy`)
- Search/filter: Job Title, Vacancy, Hiring Manager, Status dropdowns
- Table: Vacancy, Job Title, Hiring Manager, Status, Actions (Delete + Edit per row)
- Bulk select via checkboxes
- 9 records visible in demo environment

### Add Vacancy form (`/web/index.php/recruitment/addJobVacancy`)
- Required fields: Vacancy Name, Job Title (dropdown), Hiring Manager (typeahead)
- Optional: Description (textarea), Number of Positions, Active (toggle, on by default), Publish in RSS Feed and Web Page (toggle, on by default)
- When "Publish" toggle is on: RSS Feed URL and Web Page URL links are shown
- Validation: "Required" shown under Vacancy Name, Job Title, Hiring Manager on empty submit

### Edit Vacancy form (`/web/index.php/recruitment/addJobVacancy/{id}`)
- Same fields as Add Vacancy, pre-populated
- Additional "Attachments" section at bottom with "+Add" button and file table (File Name, File Size, File Type, Comment, Actions)

### Delete confirmation dialog (shared across Candidates and Vacancies)
- Title: "Are you Sure?"
- Body: "The selected record will be permanently deleted. Are you sure you want to continue?"
- Buttons: "No, Cancel" and "Yes, Delete" (with trash icon)
- X close button in top-right corner

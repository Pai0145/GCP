# Company type selection + entity-specific required documents

## Context
After OTP verification the user lands on `/onboarding/begin` (`ScreenBeforeYouBegin`, `src/app/components/onboarding/Screens.tsx:1922`), which is the account-setup/document-upload step. It has no company-type input, and its required documents (CIN, GST or address proof, PAN) are fixed. The user wants them to pick one of three company types first, and the required documents should then change with the choice:
1. Public or Private entity: add MOA and AOA.
2. LLP: add LLP agreement.
3. Partnership: add Partnership agreement.

## Approach
All changes are in `Screens.tsx` and `App.tsx`. The selector goes at the top of the documents screen, before "Required documents". No new route or screen is added, so the transitions in `go()` stay as they are.

1. **State (`App.tsx:208`)**: add `companyType: ""` to `initialOnboardingState`. Type is `"" | "company" | "llp" | "partnership"`. Keeping it in shared state means later screens (e.g. the "Organisation/Entity Type" field at `Screens.tsx:3028`) can use it. I'll leave those screens alone for now.

2. **Doc definitions (`Screens.tsx:1428-1482`)**:
   - Extend `DocKey` with `"moa" | "aoa" | "llpAgreement" | "partnershipAgreement"`.
   - Add four entries to `DOC_DEFS` with the same hint and a sample file, as the existing entries have.
   - Add icons to `DOC_ICONS` (reuse `plateIcon`).
   - Add the new keys to the `docs`, `docAlerts` and `scanningDocs` initial state at `:1928-1945`. These are `Record<DocKey, …>`, so TypeScript requires every key.
   - Add `REQUIRED_EXTRA_DOCS: Record<CompanyType, DocKey[]>`:
     - `company` → `["moa", "aoa"]`
     - `llp` → `["llpAgreement"]`
     - `partnership` → `["partnershipAgreement"]`

3. **Company type selector UI**: a three-option radio-card group with the label "Type of company", marked required with the existing `FieldLabel required`. Build it with the existing `Card` and `PrimaryButton` styling and the `PRIMARY`/`TEXT_2` tokens. The three options are "Public or Private entity", "LLP" and "Partnership". Nothing is preselected. `src/app/components/ui/radio-group.tsx` exists but isn't used in onboarding, so I'll use it only if it fits the card styling. Selecting an option calls `setState({...companyType})`.

4. **Rendering**:
   - Hide the "Required documents" section until a type is chosen, or show it disabled with a hint. I'll hide it.
   - In the list at `:2260`, append the extra docs for the selected type after PAN. They use the same upload row UI, with the file picker and sample upload, but without OCR/extraction. They are not in `fetchedDocs`, so the details/expand branches are skipped. I need to check that the row code at `:2260-2560` tolerates keys outside `gst|cin|pan` (the guards already look like they do).
   - If the user switches type, clear the uploaded files for the docs that no longer apply.

5. **Validation (`:1962`)**:
   ```ts
   const allUploaded = !!companyType && !!docs.cin && !!docs.pan
     && (gstPresent ? !!docs.gst : !!docs.address)
     && REQUIRED_EXTRA_DOCS[companyType].every(k => !!docs[k]);
   ```
   The Continue button at `:2746` is already gated on `allUploaded`. `proceedToNextStep` also writes `companyType` to state.

6. **Docs**: add a short note on company type and the extra documents to `guidelines/Guidelines.md` or `src/imports/pasted_text/corporate-gift-onboarding.md`, only if that file describes the documents step.

## Open assumption
The selector sits at the top of the existing documents screen, with no separate step. Tell me if you want a dedicated screen before it instead.

## Verification
- Run `npm run build`. Types must pass with the extended `Record<DocKey, …>` maps.
- Run the dev server and go through sign-up, then OTP, then `/onboarding/begin`:
  - Before a type is chosen, the documents are hidden and Continue is disabled.
  - Public or Private entity shows MOA and AOA as extra rows. Continue stays disabled until both, plus CIN, PAN and GST (or address proof), are uploaded.
  - LLP shows only LLP agreement, and Partnership shows only Partnership agreement.
  - Switching type removes the old extra rows and their uploads.
  - The GST-present toggle and the existing upload scenarios still work.

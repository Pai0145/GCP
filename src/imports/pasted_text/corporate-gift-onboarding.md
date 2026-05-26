Create a high-fidelity interactive desktop web prototype for a self-serve Corporate Gift Card Onboarding journey for Pine Labs.

Product context:
This is a corporate gift card procurement portal where SMBs and enterprises can sign up, verify their company, complete compliance/KYC checks, and later configure portal users for gift card ordering. The flow should reduce drop-off by using autofill, progressive disclosure, fewer mandatory fields, and post-approval setup for non-compliance tasks.

Design style:
Use a clean, premium B2B SaaS style inspired by Pine Labs.
Use a white background, soft grey dividers, subtle green highlights, rounded cards, clean input fields, and clear step progress.
Primary brand color: deep Pine green #006B5E.
Secondary background: #F5FAF8.
Text color: #1D2939.
Muted text: #667085.
Success green: #12B76A.
Warning amber: #F79009.
Error red: #D92D20.
Use modern sans-serif typography.
Keep the interface minimal, spacious, and easy to scan.

Canvas:
Create a desktop prototype at 1440px width.
Use a persistent left sidebar for journey steps.
Use a top navigation bar with Pine Labs logo, page title “Corporate Gift Card Procurement”, and a “Save & exit” action.
Footer should include Terms of use, Privacy policy, and Support links.

Main goal:
Design an end-to-end onboarding journey with the following simplified flow:

1. Account owner
2. Company verification
3. Authorised signatory
4. Review & submit
5. Verification status
6. Post-approval portal setup

Important UX principle:
Do not show every field at once. Use progressive disclosure.
Ask only the minimum Required Details upfront.
Move operational setup like maker-checker, add users, and sales POC to post-approval setup.

Prototype screens:

SCREEN 1: Welcome / Before You Begin
Create a centered card titled:
“Get started with corporate gift cards”

Subtitle:
“Verify your company once and start procuring gift cards for employees, partners, and customers.”

Show 3 benefit cards:

1. “Autofill company details”
   Description: “Enter GSTIN, CIN, or PAN and we’ll fetch available details.”
2. “Faster verification”
   Description: “Review pre-filled details instead of filling long forms manually.”
3. “Secure onboarding”
   Description: “Your information is used only for business verification and compliance.”

Show documents that may be needed only if verification requires them:

- GST certificate
- Company PAN
- Address proof
- Authorisation letter

Add primary CTA:
“Start onboarding”

Add secondary CTA:
“Continue saved application”

Interaction:
Click “Start onboarding” moves to Screen 2.

Sidebar:
Show steps:

1. Account owner
2. Company verification
3. Authorised signatory
4. Review & submit
   Current step should be highlighted.

SCREEN 2: Account Owner
Page title:
“Create your account”

Subtitle:
“Tell us who will manage this onboarding.”

Fields:

- Full name
- Email
- Mobile Number
- Expected annual gift card spend, optional dropdown

Dropdown values:

- Under ₹10 Lacs
- ₹10 Lacs - ₹50 Lacs
- ₹50 Lacs - ₹1 Crore
- ₹1 Crore+

Add helper text under annual spend:
“Optional. This helps us recommend the right setup later.”

Primary button:
“Continue”

Secondary link:
“Save and continue later”

Validation:
Continue button stays disabled until Full name, Email, and Mobile Number are filled.
Show green check icon when email and mobile are valid.
Use sample values:
Full name: John Doe
Email: john@company.com
Mobile: +91 9876543210

Interaction:
Click Continue moves to Screen 3.

SCREEN 3: Company Identifier
Page title:
“Verify your company”

Subtitle:
“Enter one company identifier. We’ll autofill everything we can.”

Create a large input section with tabs or segmented control:

- GSTIN
- CIN / LLPIN
- PAN

Default selected: GSTIN.

Field:
“GSTIN number”

Helper text:
“GSTIN helps us fetch your legal name, PAN, registered address, and state.”

Add secondary option:
“I don’t have GSTIN”

Primary button:
“Verify & autofill”

Add info callout:
“Only one identifier is needed to start. You can add missing details later if required.”

Interaction:
Click “Verify & autofill” shows a short loading state:
“Fetching company details...”
Then moves to Screen 4.

If user clicks “I don’t have GSTIN”, show CIN / PAN option and change helper text:
“Use CIN, LLPIN, or PAN to continue. Additional documents may be requested later.”

SCREEN 4: Company Details Review
Page title:
“Review company details”

Subtitle:
“We found your company information. Please confirm what looks right.”

Show success banner:
“8 details filled automatically. 2 details need your review.”

Create editable form sections:

Section 1: Business identity
Fields:

- Legal business name, prefilled: Pine Labs Private Limited
- Entity type, prefilled dropdown: Private Limited Company
- PAN, prefilled: AABCP1234F
- GSTIN, prefilled: 29AABCP1234F1Z5
- CIN / LLPIN, prefilled: U31900DL1991PLC043974

Show source labels under fields:
“Fetched from GSTIN”
“Fetched from company records”

Section 2: Registered address
Fields:

- Address line 1, prefilled
- Address line 2, optional
- PIN code, prefilled
- City, prefilled
- State, prefilled

Section 3: Billing address
Use checkbox:
“Billing address is same as registered address”

When checked, hide billing address fields.
When unchecked, expand:

- Billing address line 1
- Address line 2
- PIN code
- City
- State

Primary button:
“Save & continue”

Secondary link:
“Edit company identifier”

Interaction:
Click Save & continue moves to Screen 5.

SCREEN 5: Authorised Signatory
Page title:
“Confirm authorised signatory”

Subtitle:
“This person will accept terms and complete business verification.”

At top, show checkbox:
“Same as Personal Details”

If checked, auto-fill:

- Full name
- Email
- Mobile Number

Fields:

- Full name
- Email
- Mobile Number
- Designation dropdown

Designation dropdown values:

- Founder / Director
- Partner
- Finance Head
- HR Head
- Procurement Manager
- Admin Manager
- Other

Add conditional field:
If designation is Manager / Other, show upload request:
“Upload authorisation letter”
Helper text:
“Required if the signatory is not a director, partner, or business owner.”

Add checkbox:
“I confirm that I am authorised to act on behalf of this organisation.”

Primary button:
“Continue”

Interaction:
Click Continue moves to Screen 6.

SCREEN 6: Documents, Conditional
Page title:
“Documents”

Subtitle:
“Upload only what’s needed to complete verification.”

Show a smart checklist card.

If GSTIN and CIN were verified, show:
“No documents required right now”
Description:
“We have enough information to begin verification. If anything else is needed, we’ll notify you.”

Show optional upload cards:

- Authorisation letter
- Address proof, only if billing address is different
- Company PAN, only if PAN could not be verified

Each document card should show:

- Document name
- Why it may be needed
- Upload button
- Status: Optional / Required / Uploaded

Primary button:
“Continue to review”

Secondary link:
“Skip for now”

Interaction:
Click Continue to Review moves to Screen 7.

SCREEN 7: Review & Submit
Page title:
“Review and submit”

Subtitle:
“Check your details before sending them for verification.”

Show summary cards:

Card 1: Account owner

- Name
- Email
- Mobile Number
  Edit link

Card 2: Company details

- Legal name
- Entity type
- PAN
- GSTIN
- Registered address
  Edit link

Card 3: Authorised signatory

- Name
- Email
- Mobile Number
- Designation
  Edit link

Card 4: Documents

- No documents required / Uploaded documents list

Add declaration checkbox:
“I confirm that the information provided is accurate and I agree to the Terms of Use and Privacy Policy.”

Primary button:
“Submit for verification”

Validation:
Submit button disabled until declaration checkbox is selected.

Interaction:
Click Submit shows confirmation modal:
Title: “Submit application?”
Description: “You can still update details if verification asks for more information.”
Buttons:

- Cancel
- Submit

Click Submit moves to Screen 8.

SCREEN 8: Verification Status
Page title:
“Application submitted”

Show large success illustration or icon.

Message:
“Your company verification is in progress.”

Subtext:
“We’ll notify you at john@company.com when verification is complete. Most applications are reviewed within 24 hours.”

Show status tracker:

1. Application submitted, completed
2. Business verification, in progress
3. Portal activation, pending

Show CTA buttons:
Primary: “Go to dashboard”
Secondary: “Download submission summary”

Add support card:
“Need help?”
“Contact support if you need to update your submitted details.”

Interaction:
Click Go to dashboard moves to Screen 9.

SCREEN 9: Dashboard Pending Verification
Create a dashboard layout.

Show banner:
“Verification in progress”
Description:
“You can prepare your portal setup while we verify your business.”

Show disabled card:
“Start ordering gift cards”
Status: Locked until verification is complete

Show available setup card:
“Set up portal users”
Description:
“Add makers, checkers, and admins who will manage gift card orders.”
CTA:
“Set up users”

Interaction:
Click “Set up users” moves to Screen 10.

SCREEN 10: Portal Setup, Post Approval / Optional Setup
Page title:
“Set up portal users”

Subtitle:
“Add users who will create, approve, and manage gift card orders.”

Section 1:
“Do you want maker-checker approval?”
Use segmented control:

- Yes
- No

Helper text:
“Maker-checker adds an approval step before orders are placed.”

Section 2:
“Add users”

Fields:

- Full name
- Email
- Mobile Number
- Role dropdown

Role values:

- Admin
- Maker
- Checker
- Viewer

Button:
“Add user”

Show user table:
Columns:

- Name
- Email
- Role
- Status
- Actions

Add sample user:
Kiran Ramesh
kiran@example.com
Maker
Invite pending

Primary button:
“Finish setup”

Secondary:
“Skip for now”

Interaction:
Click Finish Setup moves to Screen 11.

SCREEN 11: Activated Dashboard
Page title:
“Corporate gift card portal”

Show success banner:
“Your portal is ready”

Show cards:

1. “Buy gift cards”
   CTA: “Create order”
2. “Manage users”
   CTA: “View users”
3. “Approval settings”
   CTA: “Configure”
4. “Invoices & billing”
   CTA: “View billing”

Show empty state:
“No orders yet”
CTA:
“Create your first gift card order”

Prototype interactions:

- Sidebar steps should update based on current screen.
- Completed steps should show green check icons.
- Active step should have pale green background and green border.
- Buttons should have hover states.
- Inputs should have focus states.
- Invalid fields should show inline errors.
- Use loading state after “Verify & autofill.”
- Use conditional expand/collapse for billing address and document upload.
- Use modal confirmation before final submit.
- Use realistic dummy data only.

UX writing style:
Clear, professional, reassuring, and minimal.
Avoid legal-heavy language unless necessary.
Use helper text to explain why information is being asked.
Replace “Upload Documents” with “Documents” because documents may not always be needed.
Avoid saying “10 of 10 fields pre-filled” if the user still has to complete fields.
Use copy like:
“8 details filled automatically. 2 need your review.”
“Only upload documents if verification needs them.”
“You can finish portal setup after business verification.”

Components to create:

- Sidebar stepper
- Header/top nav
- Form card
- Input fields
- Dropdowns
- Checkbox
- Radio/segmented controls
- Upload card
- Status banner
- Review summary card
- Confirmation modal
- Empty dashboard state
- User table
- Success state

Important simplification:
Do not include Pine Labs Sales POC in the main onboarding.
Do not force maker-checker setup during compliance onboarding.
Do not ask users to upload GST or CIN documents upfront if GSTIN/CIN verification succeeds.
Do not repeat contact details across multiple screens.
Do not ask for TAN unless needed later for tax/invoice setup.

Final prototype should feel like a smooth B2B onboarding flow that can be completed in under 5 minutes.

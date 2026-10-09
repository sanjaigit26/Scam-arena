Problem Statement
Digital scams appear in SMS messages, messaging apps, emails, websites, QR codes, fake job offers, payment requests, and impersonation attempts. People may find it difficult to identify manipulation before clicking a link, sharing information, or making a payment. A warning alone may not teach someone how to recognize the next scam.
SCAM ARENA addresses this awareness gap by combining suspicious-content analysis with interactive, educational simulations.
Our Solution
SCAM ARENA offers two core experiences:
1. Scam Arena: Users investigate simulated scam scenarios, classify them as SAFE, SUSPICIOUS, or SCAM, and receive feedback explaining the correct decision.
2. Scan & Detect: Users submit supported content for a risk assessment, including a score, classification, detected warning signs, explanation, and recommended action.
The platform is designed to make cybersecurity awareness practical, interactive, and easier to understand.
Key Features
- Gamified scam-awareness training with simulated SMS, banking, job, payment, QR, customer-support, and social-engineering scenarios.
- Interactive investigation that encourages users to inspect clues before deciding.
- Explainable risk analysis with risk scores, classifications, risk factors, evidence, and safety recommendations.
- Progression and scoring including accuracy, streaks, difficulty, and performance feedback where implemented.
- Scan & Detect workspace for analyzing suspicious content through supported input types.
- Judge Demo mode with a curated sequence suitable for live hackathon demonstrations.
- Scam intelligence dashboard with category summaries and demo analytics where implemented.
- Education mode explaining attacker intent, warning signs, possible impact, and safer next steps where implemented.
- User authentication and profile flow for account creation, login, session handling, and individual progress where implemented.
- Dark and light themes and responsive layouts.
Feature availability depends on the current implementation in the repository. Do not describe a feature as production-ready unless it has been tested.

Scam Arena Gameplay
The intended user journey is:
Open Arena → Review Scenario → Investigate Clues → Choose SAFE / SUSPICIOUS / SCAM → Review Analysis → Learn → Continue
Example scenario:
“URGENT: Your bank account will be blocked. Verify your details immediately.”

The user chooses a classification. The app then presents the scenario's expected answer, risk factors, explanation, and recommended safety actions.
Scenarios are simulated for education. They must not initiate real payments or collect real credentials.
Scan & Detect
The scanning workflow is designed to:
1. Accept supported suspicious content.
2. Validate and preprocess the input.
3. Identify warning signals.
4. Calculate or retrieve a risk assessment.
5. Present a classification and explanation.
6. Recommend safe next steps.
Possible result fields include:
- Risk score (0–100)
- Classification: SAFE, SUSPICIOUS, or SCAM
- Scam category
- Confidence estimate, if supported
- Detected red flags
- Explanation and evidence
- Potential impact
- Recommended action
A risk score is an indicator, not a guarantee. Users should independently verify unexpected requests through official channels.
Risk Analysis and Explainability
The analysis layer is designed to expose why content may be risky rather than returning only a label. Potential indicators include urgency, impersonation, suspicious links, requests for money, and requests for sensitive information.
For the hackathon MVP, results may rely on deterministic rules and predefined scenario data. Unless a live model or external AI service has actually been integrated and verified, the project should not be described as using a trained machine-learning model for every analysis.
Technology and Architecture
The exact technology stack should match the dependencies already present in this repository. The intended architecture separates:
- Frontend: pages, components, navigation, themes, and user interactions.
- Arena / scenario engine: scenario selection, round state, player decisions, and progression.
- Analysis engine: signal evaluation, risk scoring, classification, and explanations.
- Scoring and progress: score calculation, XP, streaks, badges, and mission progress where implemented.
- Data layer: scenario definitions, demo data, and user progress persistence.
- Authentication layer: registration, login, session state, and protected routes where implemented.
This modular design allows a future backend or ML/LLM analysis service to be integrated without coupling it to the gameplay UI.
Getting Started
Prerequisites
Install the runtime and package manager required by the repository. For a typical Node.js frontend, you will need:
- Node.js (use a version compatible with the project)
- npm, or the package manager indicated by the repository lockfile
Installation
1. Clone the repository:
   git clone <YOUR_REPOSITORY_URL>
   cd <YOUR_PROJECT_DIRECTORY>
2. Install dependencies using the package manager matching the lockfile:
   npm install
3. Start the development server:
   npm run dev
4. Open the local URL printed in the terminal. In the current development setup, this may be http://localhost:3000; use the actual URL shown by your server.
Available Scripts
Check package.json for the exact scripts supported by this project. Common Vite scripts include:
npm run dev
npm run build
npm run preview
Run only scripts that exist in the repository.
How to Use
First-time user
1. Open the application.
2. Create an account if registration is enabled.
3. Sign in, or use the clearly labelled demo option if available.
4. Open Scam Arena and select a scenario.
5. Investigate the available clues.
6. Choose SAFE, SUSPICIOUS, or SCAM.
7. Review the explanation and performance feedback.
8. Open Scan & Detect to analyze supported sample content.
Hackathon jury demo
1. Open the landing page.
2. Start the curated Judge Demo, if available.
3. Complete several simulated scenarios.
4. Explain the risk factors shown after each decision.
5. Demonstrate Scan & Detect using a non-sensitive sample message.
6. Show the final performance summary and explain the project's SDG alignment.
Authentication and Data Storage
If the current MVP uses browser storage for demo accounts and progress, this is prototype-only authentication. Data stored in browser storage can be read or modified by someone with access to the browser and must not be treated as secure account storage.
- Do not enter real passwords, OTPs, banking details, card numbers, or other sensitive information.
- Do not reuse a real password for a demo account.
- A production deployment should use a secure backend, proper password hashing, server-side session or token management, authorization checks, and appropriate data protection controls.
- Confirm which storage mechanism is actually implemented in the repository before relying on persistence or isolation between users.
SDG Alignment
SDG 16 — Peace, Justice and Strong Institutions
The project supports digital-safety awareness and helps users recognize deceptive interactions that may lead to fraud or abuse.
SDG 8 — Decent Work and Economic Growth
The project also addresses awareness of fake recruitment and job-offer scams that can expose people to financial loss and exploitation.
SCAM ARENA is an educational contribution to these goals; it does not claim to eliminate fraud or replace law-enforcement, financial institutions, or professional cybersecurity services.
Security and Responsible Use
- Use only simulated or non-sensitive sample content during demonstrations.
- Do not collect or request real passwords, OTPs, bank credentials, card details, or payment information.
- Do not use the platform to conduct phishing, steal credentials, deploy malware, or access systems without authorization.
- Treat analysis results as guidance, not definitive proof that a message is safe or malicious.
- Verify unexpected requests by contacting the organization using independently obtained official contact details.
Limitations
- The MVP may use predefined scenarios and rule-based analysis rather than a trained AI model.
- Demo metrics and leaderboard entries may be simulated and should be labelled accordingly.
- Browser-local data does not provide secure, cross-device account storage.
- QR, image, URL, or email analysis is available only to the extent that the relevant input and analysis flows are implemented and tested.
- A SAFE classification cannot guarantee that content is legitimate.
Future Enhancements
- Secure backend authentication and persistent user accounts.
- A validated ML/LLM analysis service with clear confidence handling.
- Broader scenario coverage and improved multilingual scam examples.
- Additional accessibility and localization options.
- Secure threat-intelligence integrations with source attribution.
- Improved evaluation using labelled test cases, false-positive rates, false-negative rates, and explainability checks.
- Optional team-based training and instructor dashboards.
Contributing
Contributions that improve detection explanations, accessibility, scenario quality, reliability, and defensive cybersecurity education are welcome.
1. Create a branch for your change.
2. Keep changes focused and document new configuration requirements.
3. Run the available build and test scripts.
4. Submit a pull request describing the change and its verification.
License
No license has been specified yet. Add a LICENSE file before presenting this repository as open source, and choose a license that matches the team's intentions.

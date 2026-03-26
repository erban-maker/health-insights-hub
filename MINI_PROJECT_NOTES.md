# Future Health Risk Assessment Using Lifestyle Analysis

# Section 1: Abstract and Index Terms

## Abstract
Future Health Risk Assessment Using Lifestyle Analysis is a full-stack health-risk assessment mini project that combines guided user data collection, rule-based prediction logic, secure account handling, and visual analytics into a single web experience. The system is built with a React and TypeScript frontend and an Express and MongoDB backend, enabling users to register, log in, submit lifestyle and health inputs, and store prediction history in a user-isolated database model. On submission, the application computes a health score and risk level through deterministic scoring rules, then presents results with category-based breakdowns, personalized suggestions, BMI interpretation, and clear follow-up guidance. The dashboard extends this experience with trend views, risk-distribution donut visualization, radial score gauge, category charts, and comparison indicators for score and BMI movement between assessments. To improve reliability and usability, the project includes loading skeletons, retry handling for API failures, chart-level empty states, and time-range filtering for recent analyses. Authentication is token-based using JWT, and backend routes enforce per-user data access so one user cannot read another user’s predictions. Automated tests validate critical behavior, including prediction isolation on backend routes and a frontend integration flow from submit to results to dashboard. Overall, the mini project demonstrates a practical blueprint for health insight applications that prioritize clarity, privacy, and maintainable delivery while remaining easy to run locally and extend for future product needs. This implementation also supports print-ready result export workflows and project-level scripts for testing, linting, and build verification, helping maintain consistent quality during incremental feature updates. The codebase structure is modular, making it suitable for further enhancements such as CI automation, expanded validations, and staged deployment planning.

## Index Terms
Health risk assessment, React, TypeScript, Node.js, Express, MongoDB, JWT authentication, user data isolation, dashboard visualization, BMI analysis, reliability testing, integration testing.

# 1 Introduction

Future Health Risk Assessment Using Lifestyle Analysis is designed as a practical web-based mini project to help users understand lifestyle-related health risk patterns in a clear and interactive way. Instead of relying on complex black-box prediction models, the system uses transparent rule-based scoring so that risk outcomes remain explainable and easier to validate during development and testing.

The project flow is structured around guided data collection, secure authentication, risk computation, and visual result interpretation. Users provide personal and lifestyle inputs, generate a risk assessment, and then review both immediate and historical insights through charts and comparison cards. The application also includes safeguards such as loading states, API error retry actions, and empty-state handling to maintain usability under different runtime conditions.

From an engineering perspective, this mini project demonstrates full-stack integration with frontend routing, backend APIs, persistent storage, user-based data isolation, and automated tests. The architecture keeps presentation logic, business rules, and data access reasonably separated, making the system suitable for academic reporting, demonstrations, and incremental enhancement.

## 1.1 System Specification

The system specification is divided into hardware and software requirements required to develop, run, and test the project reliably in a local environment. These specifications reflect the actual stack and workflows used in this mini project.

### 1.1.1 Hardware Configuration

The project does not require high-end infrastructure, but smooth development and testing benefit from a balanced machine profile. A standard modern laptop or desktop is sufficient for running the frontend server, backend server, and database service together.

- Processor: Intel Core i3 / AMD Ryzen 3 or equivalent (minimum), Intel Core i5 / AMD Ryzen 5 or higher (recommended)
- RAM: Minimum 8 GB (recommended 16 GB for smoother multitasking)
- Storage: At least 10 GB free SSD space
- Network: Stable internet for dependency installation and repository sync

For best responsiveness, SSD storage and at least 8 GB RAM are recommended because the workflow may involve simultaneous terminal processes, build tooling, and browser-based chart rendering.

### 1.1.2 Software Specification

The software stack is selected to support modular development, secure user flow, and maintainable testing. Frontend and backend are kept in separate folders and can be executed independently during local development.

- Operating System: Windows 10/11, Linux, or macOS
- Runtime: Node.js (v18 or above)
- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Recharts
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT-based token flow
- Testing: Vitest (frontend), Node test runner with Supertest (backend)
- Version Control: Git and GitHub for commit and sync workflow

In addition to these tools, environment variable configuration is required for database connection, frontend-backend integration URL, and JWT secret management. Proper local setup ensures that prediction history, user-specific isolation, and visualization features work consistently across development and verification cycles.

# 2. System Study

The system study of this mini project focuses on how the application evolved from a basic risk-check workflow into a structured full-stack platform with secure data handling and meaningful analytics. It reviews both the practical gaps observed in the earlier flow and the concrete architectural improvements implemented in the current version.

This section is important because the project is not only about generating a single risk output, but also about ensuring continuity, reliability, and user trust across the complete lifecycle: input collection, authenticated processing, persistent storage, historical comparison, and chart-based interpretation. The following subsections summarize this transition through existing-system limitations and proposed-system capabilities.

## 2.1 Existing System

Before this mini project structure was established, the health-risk flow was more fragmented from a product perspective. Users could fill health information and view outputs, but the overall experience lacked a fully connected system for secure authentication, persistent user history, and reliable dashboard-level analytics behavior. As a result, continuity between data submission, stored results, and later review was limited.

In practical terms, the earlier baseline did not represent a complete end-to-end product lifecycle. It needed stronger backend ownership of user data, better separation between accounts, and a more dependable frontend experience during loading and API-failure conditions.

### 2.1.1 Drawbacks

- Incomplete persistence flow for user prediction history in earlier stages.
- Risk of inconsistent user separation before backend-scoped prediction handling was finalized.
- Limited resilience in UI state handling for loading, retry, and chart-level empty conditions.
- Lower observability of progress trends without enriched dashboard comparisons and filters.
- Lack of full reliability coverage before dedicated backend isolation and frontend integration tests were added.

## 2.2 Proposed System

The proposed system in this mini project addresses these gaps through a full-stack, user-centered architecture. The backend now acts as the source of truth for authentication and predictions, while the frontend provides a guided, visual, and fault-tolerant interaction flow. Users can register, log in, submit health and lifestyle information, and revisit their own history through protected routes and token-based API access.

The system design also emphasizes clarity and maintainability. Risk output is generated through deterministic logic, displayed through visual summaries, and supported by usability safeguards such as loading skeletons, retry actions, and empty-state messages. This creates a more consistent experience across common and edge interaction paths.

### 2.2.1 Features

- JWT-based authentication with protected frontend routes.
- MongoDB-backed prediction storage scoped to authenticated users.
- Rule-based health score and risk-level generation from lifestyle inputs.
- Dashboard analytics with risk distribution donut chart, radial score gauge, trend views, and category views.
- Comparison insights between latest and previous assessments (score delta and BMI delta).
- Time filtering for recent analysis windows (7, 30, and 90 days).
- Results export support via print-to-PDF workflow.
- Reliability checks including backend prediction-isolation test and frontend submit-to-dashboard integration test.

# 3. System Design and Development

The system design follows a full-stack separation where the frontend handles user interaction and chart rendering, while the backend manages authentication, validation, and persistence. This split helps the mini project remain maintainable and easy to test. The frontend is route-driven and context-managed, and the backend is route-based with model-level storage in MongoDB.

From a development perspective, the design emphasizes practical usability with secure user handling, deterministic risk logic, and traceable data flow from input to result history. The implemented structure supports both immediate output generation and historical analysis on the dashboard.

## 3.1 File Design

The file organization reflects separation between frontend and backend concerns. The project is structured as a monorepo with two main directories: the root folder contains the React frontend with configuration files and source code under `src`, while `code-backend` contains the Express server with routes, models, and middleware.

Frontend file structure is organized by functional areas:

- `src/pages/` contains 14 page-level React components: `Login`, `Register`, `PersonalDetails`, `PhysicalHealth`, `LifestyleHabits`, `RiskBehavior`, `FamilyHistory`, `ReviewSubmit`, `Results`, `Dashboard`, `BMICalculator`, `DiseaseInfo`, `HealthTips`, and `Profile`. Together, these pages cover authentication, multi-step assessment input, review and submission, result interpretation, dashboard analytics, and informational utilities.
- `src/components/` holds reusable UI components and layout wrappers directly under the folder: `AppLayout.tsx`, `AppSidebar.tsx`, `Navbar.tsx`. Also contains `components/ui/` subfolder with primitive components from shadcn/ui (`Button`, `Card`, `Input`, etc.).
- `src/contexts/` holds context providers and context-related type definitions for global state: `AuthContext` for user authentication, `FormContext` (provider), and `FormContext.types.ts` for form-context interfaces/defaults.
- `src/hooks/` contains custom React hooks such as `use-mobile.tsx`, `use-toast.ts`, and `useFormData.ts` for reusable state and side-effect logic.
- `src/lib/` contains utility functions including `riskCalculator.ts` (deterministic scoring logic) and `utils.ts` (helper functions).

Backend file structure is organized by architectural layers:

- `code-backend/routes/` contains Express route handlers for each API resource (`auth.js` for registration/login, `predictions.js` for result storage/retrieval).
- `code-backend/models/` contains Mongoose schema definitions (`User.js` for account management, `Prediction.js` for risk output persistence).
- `code-backend/middleware/` contains middleware functions, primarily `auth.js` which verifies JWT tokens on protected routes.
- `code-backend/server.js` is the entry point that initializes Express, connects to MongoDB, and mounts all routes.

Configuration files at the root level include `package.json` (frontend dependencies), `vite.config.ts` (Vite build configuration), `tsconfig.json` (TypeScript configuration), `tailwind.config.ts` (Tailwind CSS configuration), and `.env.example` (environment template). Backend configuration resides in `code-backend/package.json`, `code-backend/.env.example`, and `code-backend/server.js`.

## 3.2 Input Design

Input design in this system is based on the guided multi-step health assessment workflow. The frontend implements form-based input across five primary data collection pages, with client-side state management using FormContext.

The multi-step health form captures:

- **PersonalDetails.tsx**: Name, age, gender, email for user context
- **PhysicalHealth.tsx**: Height, weight, existing medical conditions, and BMI calculation
- **LifestyleHabits.tsx**: Activity level (slider), sleep duration (hours), dietary patterns
- **RiskBehavior.tsx**: Smoking habit (yes/no), alcohol consumption (frequency), stress level
- **FamilyHistory.tsx**: Family history of diseases (checkboxes), genetic predispositions

Form validation ensures all required core fields are present before submission. Optional fields remain optional to support flexible data entry. All form data is stored in FormContext and persists across page navigation.

Input from the frontend is sent as JSON through `POST /api/predictions` with an Authorization header containing the JWT token. The backend validates all inputs before processing. Invalid inputs return a 400 error with validation messages. This two-layer validation (client and server) improves user experience while maintaining security.

## 3.3 Output Design

Output in this system flows through the Results page for immediate assessment and the Dashboard for historical analysis. Both pages emphasize clarity and support decision-making through visual summarization.

Results page outputs include:

- Risk level classification (Low/Moderate/High/Critical) with color-coding
- Health score (0-100 range) with visual gauge
- Predicted risk categories and percentage breakdowns
- BMI interpretation (underweight, normal, overweight, obese)
- Actionable health suggestions based on risk profile
- Print-to-PDF export option for documentation

Dashboard outputs include:

- Risk distribution donut chart showing frequency of risk levels across all assessments
- Radial health-score gauge displaying current score with trend indicator
- Trend chart showing health score movement over time
- Category risk bars showing which disease categories appear most frequently
- Compare card highlighting score delta and BMI delta between latest and previous assessment
- Time filters (7, 30, 90 days) for scoped historical analysis

All output includes proper loading states (skeleton loaders) while data is fetching and empty-state messages when no historical data exists. Error handling displays retry options via toast notifications for transient API issues.

## 3.4 Database Design

The database design for this mini project is built on MongoDB and organized around two core collections: User and Prediction. The design follows a user-centric model where all prediction data is linked to a specific user through `user_id`. This ensures personal data isolation, secure retrieval, and clear ownership boundaries.

The database supports two key operational levels:

- User-level tracking through User collection (account and identity)
- Assessment-level tracking through Prediction collection (risk output and history)

This separation ensures clean ownership of health records and simplifies per-user analytics and filtering.

### 3.4.1 User Collection

The User collection stores account and identity information required for authentication and profile management.

Main design points:

- Email is unique and required for login integrity.
- Password is required and stored as a hashed value using bcrypt.
- Name is required and trimmed, supporting user identity association.
- Automatic `createdAt` and `updatedAt` timestamps help with account lifecycle tracking and audit context.

Typical attributes: `_id`, `name`, `email`, `password`, `createdAt`, `updatedAt`

### 3.4.2 Prediction Collection

The Prediction collection is the core assessment record. Each document captures the complete health assessment data and computed risk output.

Main design points:

- Linked to user through required `user` field (ObjectId reference) to enforce user-scoped data access.
- Risk level and health score are stored as computed outputs for quick retrieval and historical comparison.
- Form data (age, BMI, activity level, sleep, smoking, family history) is persisted in `formData` alongside result for full traceability.
- Predictions are timestamped with `createdAt` for historical ordering and time-range filtering (7, 30, 90 day windows).
- Predicted diseases and suggestion lists are stored as arrays for chart-based visualization.
- BMI-related data includes both numeric `bmi` value and categorical `bmiCategory` for interpretation.
- Category scores are stored as structured objects with name, score, and risk level for detailed analytics.

Typical attributes: `_id`, `user`, `formData`, `riskLevel`, `healthScore`, `predictedDiseases`, `suggestions`, `bmi`, `bmiCategory`, `categoryScores`, `createdAt`, `updatedAt`

### 3.4.3 Indexing and Data Isolation

The project uses practical indexes to improve query speed for user history and recent-data retrieval.

Implemented index strategy:

- Prediction: `user` + `createdAt` (descending) for chronological user assessment history

Data isolation strategy:

- All protected backend queries filter by authenticated `user` reference extracted from JWT payload.
- Users can access only their own predictions and assessment history via backend validation.
- This model strengthens privacy and keeps analysis personal and accurate.

### 3.4.4 Design Summary

Overall, the database design is lightweight but structured enough for both operational use and analytical outputs. It balances accessibility (flat document model, optional fields) with consistency (user-scoped access via reference, automatic timestamping, and clear ownership boundaries). This makes it suitable for a health assessment application where deterministic risk scoring and historical trend analysis must work together in the same system.

## 3.5 System Development

System development was carried out as iterative integration across frontend, backend, and test layers. The implementation moved from basic interface flow to authenticated, database-backed behavior with chart-driven analytics and reliability checks. Changes were validated through unit/integration testing and build checks during development.

The final development state includes protected routing, token-authenticated API calls, persistent prediction history, data-specific visualizations, and defensive UI handling for loading and API failures.

### 3.5.1 Description of Modules (Detailed Explanation - Mini Project work)

Authentication Module
The authentication module handles account creation, login validation, and authenticated session continuity across the application. The frontend `Login.tsx` and `Register.tsx` pages provide controlled form inputs for user credentials and communicate with backend endpoints `POST /api/auth/register` and `POST /api/auth/login`. After a successful response, user profile details and JWT token are stored for protected navigation and API access.

On the backend, `auth.js` validates name length, email format, and password constraints before processing requests. Registration hashes the password using bcrypt and stores user details in MongoDB, while login verifies credentials against the stored hash and issues a 7-day JWT token. This module forms the entry point for all protected project features and ensures only authenticated users can access personal prediction history.

Form Collection Module
The form collection module manages the complete health-assessment input lifecycle through multiple pages: `PersonalDetails.tsx`, `PhysicalHealth.tsx`, `LifestyleHabits.tsx`, `RiskBehavior.tsx`, and `FamilyHistory.tsx`. Each page captures a specific category of user information so data entry remains structured and easier to complete.

`FormContext.tsx` acts as the shared state container for all input fields and updates partial values from each step without losing previously entered data. The `ReviewSubmit.tsx` page then aggregates all collected fields into a final review layout, allowing users to verify entries and navigate back for corrections. This module improves data consistency and creates a clean bridge between input capture and risk-processing logic.

Risk Calculation Module
The risk calculation module is implemented in `riskCalculator.ts` and converts collected form data into explainable health-risk outputs. The algorithm uses deterministic scoring logic based on age, BMI, activity level, sleep duration, smoking habit, and family history. Each factor contributes to an aggregate risk profile that is transformed into a `healthScore` and `riskLevel`.

Beyond the final risk label, this module generates practical analytical outputs including predicted disease categories, personalized suggestions, BMI category classification, and normalized category scores for chart visualization. Because all scoring rules are centralized in one utility file, output generation remains consistent across the application and easier to validate with tests.

Prediction Persistence Module
The prediction persistence module connects frontend actions with durable backend storage. After risk computation, `FormContext.tsx` submits both `formData` and computed `result` payload to `POST /api/predictions`. It also calls `GET /api/predictions` to retrieve the authenticated user's historical records for dashboard and results continuity.

In `predictions.js`, the backend validates required payload structure and ensures allowed types before writing records to MongoDB. Each prediction document is linked to the authenticated user id and timestamped for historical ordering. Fetch operations are sorted by latest entries and restricted to user scope, preventing cross-account data leakage and ensuring a reliable history timeline.

Results and Dashboard Visualization Module
The visualization module includes `Results.tsx` for immediate post-submission interpretation and `Dashboard.tsx` for ongoing historical analysis. The results page highlights core outputs such as risk level, health score, BMI status, category-based chart views, and personalized suggestion blocks. It also supports export through print-to-PDF for documentation and report use.

The dashboard page extends this by presenting trend-aware analytics, including risk distribution donut chart, radial health-score gauge, category bars, and comparison metrics between current and previous tests. It includes practical UX safeguards such as loading skeletons, retry options on fetch failure, and chart-level empty-state messages. Together, these pages convert raw prediction output into user-friendly and interpretable decision support.

Security and Route Protection Module
This module enforces end-to-end access control in both frontend and backend layers. On the frontend, `ProtectedRoute.tsx` ensures that internal pages are only accessible when a valid authenticated user exists in context. In `App.tsx`, protected assessment and dashboard routes are grouped inside this guard so unauthorized users are redirected to login flow.

On the backend, `requireAuth` middleware checks the JWT bearer token, verifies signature and expiry, and injects user identity into request context. Backend routes such as `/api/predictions` rely on this identity for user-scoped operations. This coordinated protection model ensures private health records remain secure and route access follows authentication boundaries.

Testing and Reliability Module
The testing and reliability module validates critical behavior at both API and UI workflow levels. Backend reliability is checked through `predictions.isolation.test.js`, which verifies prediction history isolation so one user cannot read another user's stored records. This directly supports the privacy requirement of the mini project.

Frontend reliability is validated with `submit-result-dashboard.integration.test.tsx`, which confirms the main user journey from review submission to results rendering and then dashboard navigation. Additional checks through test, lint, and build scripts are used during development to catch regressions early. This layered reliability approach improves confidence in both functionality and maintainability as the project evolves.\n\n## 4. Testing and Implementation

Testing and implementation in this mini project were carried out iteratively, where each core feature was developed and validated in integrated workflow conditions. Since the system is a full-stack application, implementation aligned frontend behavior, backend route logic, and persistent data handling simultaneously. Verification was performed continuously throughout development to ensure the form flow, authentication, scoring logic, and dashboard analytics remained consistent after each integration change.

The implementation sequence followed dependency order: authentication was prioritized first because all protected features depend on user identity and secure route access. After registration and login were stable with JWT token handling, the multi-step health assessment flow was implemented page by page with shared state via `FormContext`. Once submission and result generation worked reliably, prediction persistence APIs were connected, and the `Results` and `Dashboard` pages were refined to present both immediate output and historical analytics from real stored records.

From a practical testing perspective, the project combined targeted automated tests with scenario-driven manual checks. This approach suited the mini project scope while validating critical reliability points such as user isolation, protected API behavior, and end-to-end navigation. Build and lint checks supported implementation quality control and helped detect integration regressions early.

### 4.1 Testing Approach

The testing approach was organized around real user actions and expected system responses. The goal was to verify whether a user could smoothly move from account creation to risk analysis and historical review without data leaks, route failures, or inconsistent outputs.

Key testing coverage included:

- Authentication workflow: register, login, token persistence, protected route enforcement.
- Form workflow: multi-step data entry, state carry-forward between pages, review and correction flow.
- Prediction API behavior: `POST /api/predictions` payload acceptance and `GET /api/predictions` user-scoped retrieval.
- Risk-output consistency: deterministic score and category generation from identical inputs.
- Dashboard behavior: chart rendering with stored data, time-filter functionality (7/30/90 days), and comparison cards.
- Resilience checks: loading states, empty-state rendering, API retry handling, and error toasts.
- Security checks: backend JWT validation and cross-user prediction isolation.

Automated reliability checks include backend prediction-isolation testing (`predictions.isolation.test.js`) and frontend workflow testing (`submit-result-dashboard.integration.test.tsx`). These verify that privacy boundaries and primary user journeys behave as expected under realistic conditions.

### 4.2 Implementation Summary

The final implementation uses a two-tier architecture: React + TypeScript on the frontend and Express + MongoDB on the backend. Frontend pages and contexts manage interaction and state, while backend routes and middleware enforce validation, authentication, and persistence rules. This separation maintained code simplicity and enabled module-level debugging without affecting unrelated layers.

Implementation outcomes achieved include:

- JWT-based secure authentication with protected route access.
- Structured multi-step health data collection via centralized context state.
- Deterministic risk scoring with explainable output generation.
- Persistent prediction history linked to authenticated users.
- Visual analytics through results and dashboard charts.
- Historical comparison support for score and BMI movement tracking.
- Export-ready result presentation via print-to-PDF workflow.
- Automated test coverage for critical flows.

Development was supported through script-driven workflows for frontend, backend, tests, linting, and production build verification. Environment-based configuration enabled consistent setup across local machines and reduced configuration-related issues.

### 4.3 Validation Observations

During final validation, the system demonstrated stable behavior across all major workflows. User onboarding, multi-step input collection, result generation, and dashboard retrieval operated correctly with protected access boundaries. Charts updated according to stored records, and the interface remained usable under empty-data and error conditions.

Observed strengths:

- Clear full-stack separation between presentation, business logic, and persistence.
- Consistent user-scoped data isolation across protected APIs.
- Deterministic and explainable scoring behavior for repeated inputs.
- Smooth transition from input pages through review, results, and dashboard.
- Practical reliability safeguards via loading, retry, and empty-state handling.

Observed limitations (scope-based):

- Automated test coverage focuses on critical paths rather than full feature coverage.
- Risk model is rule-based and can be expanded with further domain calibration.
- Analytics views can be extended with richer longitudinal analysis and additional report formats.

Overall, implementation and testing confirm that the mini project delivers a secure, usable, and maintainable health-risk assessment platform with reliable end-to-end flow.

## 5. Conclusion

Future Health Risk Assessment Using Lifestyle Analysis successfully demonstrates how a full-stack web application transforms lifestyle and health inputs into structured, interpretable risk insights. The project balances usability and technical discipline by combining guided multi-step input, transparent rule-based scoring, secure authentication, persistent storage, and chart-supported historical interpretation.

A major contribution is the practical continuity across the full assessment lifecycle. Users are not limited to one-time output; they can submit data, review immediate risk interpretation, and revisit historical results through a protected dashboard supporting trend analysis, category distribution, and comparison between assessments. This continuity improves understanding and makes the platform more valuable than a single-page prediction tool.

From an engineering perspective, the implementation validates a modular architecture using React, TypeScript, Express, and MongoDB with JWT-based access control. The separation of frontend and backend responsibilities, context-based state management, middleware-driven route protection, and user-scoped database queries reflect sound design practices suitable for academic standards and real-world extension. Reliability measures such as loading-state handling, retry behavior, empty-state messaging, and targeted automated tests improve confidence in functional stability.

In conclusion, the project fulfills its objective: building a secure and explainable health-risk assessment application that remains practical for users and maintainable for developers. While future enhancements can include broader automated testing, deeper analytics, and extended model sophistication, the current version provides a complete and credible foundation for further development and deployment refinement.


# TalentFlow – A Mini Hiring Platform (Front-End Only)

This project is a React application designed to simulate a mini hiring platform, allowing an HR team to manage jobs, candidates, and assessments. It adheres to the requirements of the React Technical Assignment, focusing on front-end implementation with a mocked backend using MSW and local persistence via IndexedDB.

## Table of Contents
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [API Simulation and Data Persistence](#api-simulation-and-data-persistence)
- [Technical Decisions](#technical-decisions)
- [Known Issues / Future Improvements](#known-issues--future-improvements)

## Features

### 1. Jobs Board
- **Listing:** Displays a list of jobs with server-like pagination, filtering (title, status, tags), and sorting.
- **Create/Edit Job:** Allows HR to create new jobs or edit existing ones via a modal interface. Includes validation for required fields (e.g., title, unique slug).
- **Archive/Unarchive:** Jobs can be archived or unarchived, changing their status.
- **Reorder:** Supports drag-and-drop reordering of jobs with optimistic updates and rollback on failure for a smooth user experience.
- **Deep Linking:** Each job has a unique URL (`/jobs/:jobId`) for direct access.

### 2. Candidates
- **Virtualized List:** Efficiently displays a large number of seeded candidates (1000+) with client-side search (name/email) and server-like filtering (current stage).
- **Candidate Profile:** A dedicated route (`/candidates/:id`) shows a candidate's detailed profile, including a timeline of status changes.
- **Stage Management (Kanban-like):** Candidates can be moved between different hiring stages, likely through a drag-and-drop interface (e.g., a Kanban board).
- **Notes with @mentions:** HR can attach notes to candidate profiles, supporting rendering of `@mentions` (suggestions from a local list).

### 3. Assessments
- **Assessment Builder:** Allows HR to create job-specific quizzes/forms with various sections and question types (single-choice, multi-choice, short text, long text, numeric with range, file upload stub).
- **Live Preview:** Provides a real-time preview pane that renders the assessment as a fillable form during the building process.
- **Local Persistence:** Builder state and candidate responses are persisted locally using IndexedDB.
- **Form Runtime:** Assessments can be filled out by candidates, featuring validation rules (required, numeric range, max length) and conditional questions (e.g., show Q3 only if Q1 === “Yes”).

## Technical Stack
- **React:** Front-end library for building the user interface.
- **MSW (Mock Service Worker):** Used to simulate a REST API, intercepting network requests and providing mock responses.
- **Dexie.js:** A wrapper for IndexedDB, used for local data persistence.
- **React Router:** For client-side routing.
- **Drag and Drop Libraries:** (Likely `react-beautiful-dnd` or similar) for reordering jobs and moving candidates between stages.
- **Other UI Libraries/Styling:** (e.g., CSS Modules, Tailwind CSS, or custom CSS) for styling components.

## Project Structure
The project follows a standard React application structure:
- `public/`: Static assets.
- `src/`: Main application source code.
    - `components/`: Reusable UI components, categorized by feature (e.g., `jobs`, `candidates`, `assessments`, `common`, `ui`).
    - `contexts/`: React Context API for global state management (e.g., `UserContext.jsx`).
    - `db/`: Dexie.js setup and database schema (`dexie.jsx`).
    - `mocks/`: MSW setup, including `browser.jsx` (worker initialization) and `handlers.jsx` (API route definitions).
    - `styles/`: Global stylesheets (`global.css`).
    - `utils/`: Utility functions, including `fakeSeed.jsx` (for generating initial data) and `storageUtils.js` (for local storage operations).
    - `App.jsx`: Main application component, likely handles routing.
    - `index.jsx`: Entry point of the React application.

## Setup and Installation
1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_LINK]
    cd talentflow
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application
To start the development server:
```bash
npm start
```
The application will typically run on `http://localhost:3000`.

## API Simulation and Data Persistence
- **MSW:** The application uses MSW to intercept API calls (`/api/*`) and return mock data. This allows the front-end to function as if it's interacting with a real backend.
- **IndexedDB (via Dexie.js):** All data persistence (jobs, candidates, assessments, applications) is handled locally using IndexedDB. MSW handlers are configured to read from and write to this local database.
- **Seed Data:** Upon application load, `src/utils/fakeSeed.jsx` generates initial data (25 jobs, 1000+ candidates, 3+ assessments) and populates the IndexedDB.
- **Network Simulation:** MSW handlers introduce artificial latency (200-1200ms for writes, 50-300ms for reads) and a 5-10% error rate on write endpoints to simulate real-world network conditions and test optimistic UI updates/rollback mechanisms.

## Technical Decisions
- **Front-End Only:** Adhering strictly to the requirement, no actual backend server is used. All "server-like" interactions are managed by MSW.
- **Local Persistence:** IndexedDB was chosen for robust local data storage, ensuring data persists across browser refreshes. Dexie.js simplifies IndexedDB interactions.
- **Optimistic UI Updates:** Implemented for actions like reordering jobs to provide immediate feedback to the user, with rollback logic in case of API simulation failures.
- **Modular Component Design:** Components are organized by feature and responsibility, promoting reusability and maintainability.
- **Context API:** Used for managing global state (e.g., user roles, themes) to avoid prop drilling.

## Known Issues / Future Improvements
- **Accessibility:** Further improvements could be made to ensure full accessibility compliance.
- **Testing:** Comprehensive unit and integration tests could be added for critical components and API interactions.
- **UI/UX Enhancements:** Refinements to the user interface and experience based on user feedback.
- **Error Handling:** More granular error handling and user feedback for various API failure scenarios.

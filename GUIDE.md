# Student Management Dashboard - Mentoring Guide

This project demonstrates key JavaScript and React concepts as follows:

## Async/Await and API Calls
- The `fetchCourses` function in `src/api/courses.js` simulates an asynchronous API call using `async/await` and `setTimeout`.
- In `App.js`, the `useEffect` hook calls this function asynchronously to fetch the list of courses.
- Error and loading states are handled gracefully to improve user experience.

## Event Loop Demonstration
- The mock API uses `setTimeout` to simulate network delay, demonstrating how asynchronous callbacks are handled in the JavaScript event loop.
- This shows how async code is non-blocking and allows the UI to remain responsive.

## Hoisting
- Function declarations like `fetchCourses` are hoisted, meaning they are available before their definition in the code.
- Variable declarations using `const` and `let` are not hoisted in the same way, which is why they are declared before use.

## React Best Practices
- Functional components and React hooks (`useState`, `useEffect`, `useMemo`) are used for state and lifecycle management.
- Controlled components are used for form inputs to keep React state as the single source of truth.
- `useMemo` is used to optimize performance by memoizing the students count to avoid unnecessary recalculations.
- Components are modular and reusable (`StudentForm`, `StudentList`).
- Proper error handling and user feedback are implemented.
- The UI is responsive and accessible, with semantic HTML and ARIA attributes.

## Code Comments
- Key parts of the code are commented to explain logic and React concepts.
- This helps new developers understand the flow and best practices.

This guide can be used to mentor students on modern React development and JavaScript asynchronous programming concepts.

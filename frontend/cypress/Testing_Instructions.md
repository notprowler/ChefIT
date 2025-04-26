# Cypress Testing Instructions

## Prerequisites
1. Make sure to build the project `npm run build` and `npm run preview` to run the built files.
2. `npm install` to ensure cypress and other libraries are installed
3. Make sure the application is running locally (e.g., `npm run preview`).

## Running Cypress Tests

### Open Cypress Test Runner
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Open the Cypress Test Runner:
   ```bash
   npx cypress open
   ```
3. In the Test Runner, select the `E2E Testing` option and choose your preferred browser (chrome testing for now).
4. Click on a test file to run it.

### Run Cypress Tests in Headless Mode
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Run all tests in headless mode:
   ```bash
   npx cypress run
   ```

## Writing New Tests
1. Add tests to existing test file or Create a new test file in the `cypress/e2e` directory with a `.cy.ts` extension.
2. Use the following template to write your test:
   ```typescript
   describe('Test Suite Name', () => {
     it('Test Case Name', () => {
       // Test steps go here
       cy.visit('/'); // Example: Visit the home page
       cy.get('selector').click(); // Example: Interact with an element
     });
   });
   ```

## Debugging Tests
- Use `cy.pause()` to pause the test at a specific step.
- Use `cy.debug()` to print debugging information to the console.

## Additional Resources
- [Cypress Documentation](https://docs.cypress.io/) for detailed guides and API references.
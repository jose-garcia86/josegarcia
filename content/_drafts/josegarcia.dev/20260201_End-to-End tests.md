# End-to-End Tests

We’ve seen how unit tests check the details and integration tests make sure the components work together. Now it’s time for the top of the testing pyramid: **End-to-end (E2E) Tests**.

Rather than thinking like developers, E2E testing means stepping into your user’s shoes and experiencing the system as they would. Instead of asking , “Does this function return the right value?”, the real question becomes: **”Can a user log in, add an item, and check out successfully —without anything breaking?”**

E2E tests are like a dress rehearsal for your application. They exercise your system from front to back, just as a customer would —from launching the app through every step of a real workflow. Let’s walk through what this often looks like in practice.

## Common Steps in an End-to-End Test

1. **Launch the Application**: Start up the database, backend, and frontend —everything needed for a real user session.
2. **Navigate to Login**: Use automated tools (like Selenium or Playwright) to control a browser for a real user session.
3. **Authenticate**: Fill in credentials and submit the login form —verifying the login flow works.
4. **Access a Feature**: In this case, navigate to your tasks or dashboard page, checking navigation and routing.
5. **Create and Verify**: Add a new item (like a task), and make sure it appears as expected —verifying that data storage backend logic, and UI are all working together.

**Example**: With code, you’d set up your browser driver (such as Selenium WebDriver), then script the steps: visit the login page, fill in credentials, click the login button, access the input for a new task, create it, and verify the UI updated as expected. Each step mimics exactly what a human would do, but is automated.

## Why E2E Test Matter (and Their Trade-offs)

**System tests** (another name for E2E tests) give you high confidence that your product works for your users, covering real scenarios from start to finish. But they come with costs:

- **Slower**: They’re the slowest kind of test —sometimes taking minutes— because they require full systems to run and interact.
- **Fragile**: E2E tests can break easily. Even small UI changes (like renaming a button or changing an element’s ID) may cause failures, even if the application logic is still correct.
- **Expensive to Write and Maintain**: They often require detailed setup and regular maintenance as your system evolves.

These limits are why you’ll usually write E2E tests for the *most critical* user paths —such as registration, logging in, critical transactions or checkout flows.

**Pro tip**: Strike a balance. E2E tests are powerful because they give whole-system confidence, but too many can slow you down and become burdensome to maintain. Focus on the most important journes for your users, and ensure they stay reliable.

End-to-End tests cap off your testing pyramid, giving you that final assurance: not only do individual pieces work, but your whole system delivers real value for your users —end to end.
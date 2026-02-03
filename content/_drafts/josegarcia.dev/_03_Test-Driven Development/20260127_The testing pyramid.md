# The Testing Pyramid

Test-Driven Development loop helps you build and verify individual parts of your software. Now let’s zoom out and explore the broader testing landscape using the **Testing Pyramid** —a helpful metaphor for categorizing and organizing different types of software tests.

The core idea behing the **Testing Pyramid** is straightforward:

- At the base, you have many fast, isolated tests —called **unit tests**
- In the middle, you have fewer **integration tests**
- And at the top, you have the smallest number of slow, high-value **end-to-end test** (sometimes called **system tests**)

Each type of test comes with its own characteristics, costs, and benefits. The base should be wide, filled with “cheap” and “fast” tests, while the peak holds only essential “expensive” and “slow” tests. Imagine a funnel —most issues are caught quickly at the wide base, while the narrow top is reserved for the most critical checks that are slower to run.

## Unit Tests

**Unit tests** are the most granular level. They focus on small units of code, like a single function or class method. They key characteristic is *isolation* —a unit test should run without relying on a database, the network, or the file system. In other words, it should only test your code, not its environment.

Thanks to their isolation and simplicity, unit tests are incredibly fast —often running in milliseconds— so you can run thousands of them frequently. This speed enables the rapid feedback loop that makes TDD so powerful. Think of unit tests as the foundational bricks of your software: if they’re solid, your overall structure is much more trustworthy. 

## Integration Tests

Above unit tests are **integration tests**. These check how different pieces of your application work together —for example, verifying that an API correctly communicates with a database, or that various services exchange data as expected.

Integration tests are like the plumbing of your application, ensuring data flows correctly and components communicates reliably. Unlike unit tests (which often use mocks or fakes), integration tests often use actual databases, API, or files, making them more realistic but when real parts interact in a near-production environment.

## System Tests (End-to-End)

At the top of the pyramid are **system tests**, also known as **end-to-end (E2E) tests**. These tests simulate how a real user interacts with the whole application —from the front end through to the back end and any external services.

E2E tests are the most complete and realistic; they ensure your software delivers on key user journeys and behaves as expected in real-world scenarios. However, they’re the slowest and most brittle, so you want only a handful of these validating the most critical workflows —think of it as a final “walkthrough” of your software, checking that everything works together seamlessly.

## Putting it All Together

None of these test types is “better” than the others —they’re different tools with different purposes. Together, they form a safety net that guarantees the ongoing quality and reliability of your software.

Whenever you plan your testing strategy, ask yourself: at this stage of development, which type of test delivers the most value? Sometimes you need the fast feedback of unit tests, sometimes the connectivity checks of integration tests, and sometimes the confidence of a full end-to-end test. That’s how you use the right tool for the job at every stage of development.
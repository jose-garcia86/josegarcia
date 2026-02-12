# Workflow of Test-Driven-Development procees

Use two main files:

- core_code.py
- Test_core-code.py

Test are kept separate for clarity. Test functions and files begin with `test_` so automated tools can find them easily.

The workflow follows the Test-Driven-Development (TDD) process:

- Write a failing test first (“red” phase). For example, test a function like `add_expense` before it exists.
- An error (like ImportError) is expected as this stage —it shows what needs building next.
- Create a simple, minimal implementation to pass the test (“green” phase), even if the solution is basic or temporary.
- Run test using tools like **pytest** to confirm behaviour.

Tests give instant feedback that helps improve code safely. Once a feature passes its tests, improvements and restructuring can happen with confidence since tests protect against mistakes.
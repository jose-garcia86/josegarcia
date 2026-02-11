# Best Practices for Testing with Python and Pytest

Testing is essential to building robust software. Let’s talk about some best practices when using Python and Pytest for automated testing.

## Why Python and Pytest?

We’ve chosen Python because it’s versatile, readable and has a rich ecosystem.

- Python’s built-in module, **unittest**, comes from the xUnit family of frameworks and is perfectly serviceable.
- However, in modern Python development, the industry standard is increasingly **pytest**.
- With purest, you use plain `assert` statements and avoid much of the boilerplate code required by `unittest`.
- If you’re familiar with unittest, your knowledge transfer directly -pytest just allows you to write less code for the same tests.

Pytest also has:

- An extensive ecosystem of plugins.
- Powerful features like **fixtures** and **parameterization** to support advance testing patterns.

## Installing and Verifying Pytest

If you want to set up pytest locally:

1. Create and activate a virtual environment

   ```python
   python -m venv venv
   source venv/bin/activate
   ```

2. Install pytest using pip:

   ```python
   pip install pytest
   ```

3. Verify the installation

   ```python
   pytest --version
   ```

You should see the installed pytest version printed, confirming it’s ready to use.

## Recommended Project Structure

A typical project structure looks like this:

```bash
my_project/
│
├── my_app/
│     └── __init__.py
│     └── task_manager.py
│     └── ... (your application modules)
│
├── tests/
│     └── __init__.py
│     └── test_example.py
│     └── ... (your test files)
│
└── ...
```

- **my_app/** : your actual application code.
- **tests/**: A dedicated directory for all your test files. Keeping tests separate from your main codebase aids clarity and maintainability.
- **init.py**: files: Indicate that `my_app` and `tests` are Python packages, which is important for importing modules.

This structure is widely recognized as a best practice.

## How Pytest finds your Tests

Pytest detects and collects tests automatically if you follow certain naming conventions:

- **Test files**: Filenames should start with `test_` or end with `_test.py`
- **Test functions**: Function names should start with `test_`
- **Test classes (optional)**: Class names should start with `Test`, and their methods should also start with `test_`

These conventions are not only best practices -they are pytest defaults and widely adopted across the Python community.

If needed, you can customize discovery in a `pytest.ini` file.

## Running Tests with Pytest

To run your tests:

Open a terminal at your project root and run:

```bash
pytest
```

Pytest will automatically find and run all tests following the naming conventions.

### Test result indicators:

- `.`  - Test passed
- `F`  - Test failed (assertion was false)
- `E`  - Test crashed before an assertion (an error occurred)
- `s`  - Test was skipped

You can also run tests in:

- A specific directory
- A specific file
- A specific test function within a file

## Understanding Test Results

Pytest’s output is designed to help you diagnose issues quickly:

- **Failure indicator**: `F` or `E` tells you which tests did not pass.
- **Error Message**:
  - Assertion failures show `AssertionError` with expected vs actual values.
  - Other errors should show the exception type (e.g., `TypeError`, `KeyError` ) and short description
- **Location**: Pytest shows the file path and line number in the traceback -bottom line is your starting point.

## Embracing Failures as Opportunities

When a test fails, think of it as an automated, precise bug report that surfaces issues immediately -often before anyone else sees your code.

- Early detection prevents defects from slipping into later stages or production
- Fixing issues now is faster and cheaper that fixing them during manual QA or after deployment.

Don’t fear test failures. Use them as opportunities to improve and strengthen your codebase.
# Unit Test

Unit tests sit at the very base of the testing pyramid. They check small pieces of code —like functions or methods— in isolation, and provide rapid feedback. Because they zero in on the smallest testable units of your application, they help you catch bugs quickly and with precision.

To write effective unit tests, it’s helpful to consider three key categories:

1. The Happy path
2. Edge Cases
3. Business Rules

Let’s look at each of these with concrete examples:

## 1. The Happy Path

The “Happy path” is the most common, expected way your code will be used —when everything works perfectly, without any errors or surprises. Unit tests along the happy path help clarify what success looks like for a piece of functionality and are usually the first tests you write for a new feature.

**For example**: If you write a function to add a task to your task manager, the happy path test would check that the total task count increases after adding a new item.

## 2. Edge Cases

After covering the happy path, think about the boundaries —conditions that are unusual, minimal, maximal, or just a bit strange. These are the **edge cases**: inputs or situations at the limits of what your code is expected to handle.

Testing edge cases is critical for uncovering bugs that normal workflows won’t reveal, but which could cause your application to crash or behave incorrectly in some scenarios.

**For example**: What happens if you try to add a task with an empty string as the title? A good unit test would check the situation and expect your code to raise a `ValueError`.

Ask yourself: *What’s the most unusual, but still possible, input I can give this function?*

## 3. Business Rules

Business rules are the official policies and requirements of your application —think “no duplicate users”, “orders must be have a minimum value”, or “email must be unique”. Unit tests for business rules ensure your application’s core logic behaves as intended and doesn’t drift from requirements.

**For example**: If your rule is that duplicate tasks aren’t allowed, test that adding the same task twice does not increase the count —your task manager should contain only unique entries.

## Why are Unit Tests so effective?

There are severa reasons unit tests are the backbone of reliable software:

- **Fast**: Unit tests run in milliseconds, giving you near-instant feedback so you can move quickly and confidently during development.
- **Isolated**: Each unit test is fully self-contained and doesn’t rely on external systems like databases or APIs. This makes the results consistent and prevents a sigle failure from cascading across multiple tests.
- **Numerous**: Since each unit test covers only a small part of your code, you can (and should) write many of them —often hundreds or even thousands over the life of a project.
- **Precise**: When unit test fails, you know exactly which unit of code is responsible. This makes debugging much faster and easier.

Think of your unit tests as code bodyguards: they stop bugs before they get into your system, and they let you refactor or add features with confidence —without that “what did I just break?” Panic.

**Pro tip**: Don’t try to cover everything from the start. Begin by testing one function, one tiny piece of logic, and focus first on the happy path. Build from there. Just like with working out, consistency matters more than going all-in once a year.

Unit tests are foundational practice for building trustworthy, maintainable software.
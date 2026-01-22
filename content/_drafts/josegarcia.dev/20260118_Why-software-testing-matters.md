# Why software testing matters

## The traditional way of writing software

Le’ts take a moment to reflect on what many of us consider the “traditional” or even the “default” way of writing software. This process often feels natural and intuitive, but it comes with its own set of challenges. 

1.  **Idea Sparks Action**

   It all starts with a concept, feature, or bug fix you want to implement.
2. **Dive into Coding**

   Excited, you dive straight into writing a lof of code. Sometimes you spend hours, maybe even days, focusing on building out significant parts of the feature -usually without pausing to check if everything is working as expected.
3. **Run the Application**

   Once you think you’re done, you run your application -maybe from the command line, maybe in a browser, or through your IDE.
4. **Manual Testing**

   Now begins the manual testing phase. You click through the interface, input different data, and see if your new code appears to work. You might try to make sure that existing features still behave as expected.
5. **Cross Your Fingers and Hope**

   After all the manual checking, you deploy your work -fingers crossed, hoping nothing broke along the way. This reliance on hope makes the workflow risky and inefficient.

## Classic Developer Frustrations

Most of us have been there before, especially those nerve-wracking moments before deployment.

- **Fear of Refactoring**: You heistate to improve or reorganize your own code for fear of breaking something unexpected.
- **”It worked on my machine!**: The classic: everything was fine locally, but it fails for someone else or in production.

## The Cost: Technical Debt and Fragility

Over time, this way of working leads to technical debt. As the codebase grows messier and more complex, it becomes harder and slower to make changes.

- Teams have to spend extra time untangling and debugging code.
- Development velocity slows down. Fewer features get shipped.
- Confidence in the stability of the system drops. Developers worry that any new change might break something.
- The codebase becomes increasingly fragile -a tough cycle to break.

## Breaking the Cycle: Automated Testing

How do we break free from this cycle?

We move from hoping our software works to systematically testing it.

## What Is Software Testing?

At its core, software testing is about verifying that the code behaves as expected. You explicitly state what must be true about your code using assertions.

- In **Python**. the keyword `assert` . If asserted condition isn’t true, the test fails and tells you where and why.
- In other languages, your might see keywords or macros like `assert`, or helper functions like `assertThat`, `expect`, or `require`.

No matter the language, these assertions hel us answer: **Does the code do what it’s supposed to do?**

## Catching Regressions

Tests are particularly valuable for catching regressions -where something that used to work now breaks.

**For example**

Suposse you have an online shopping cart that correctly calculates the total. Then, you add a discount feature. If a bugin the discount logic causes the cart total to show `”None”`instead of a price, that’s a regression.

A good test would be catch this immediately and prevent the bug from sneaking into production.##

## The Wider World of Testing

Testing isn’t just about whether code works. There’s a universe of specialized testing, including:

- **Performance Testing**: Does your app stay fast and responsive under load?
- **Security Testing**: Are there vulnerabilities that could jeopardise user data?
- **Usability Testing**: Does your application feel intuitive and easy for users?
- **Other Types**: Accessibility, compatibility, and more.

In this course, our primary focus will be on **automated functional testing** -a crucial foundation for building reliable software. As your grow your skills, you’ll be able to expand into these specialized areas.

## From Hope to Confidence

The more you practice and embrace testing, the less you’ll need to rely on luck. Testing lets you deploy with confidence, knowing your code is reliable and robust.
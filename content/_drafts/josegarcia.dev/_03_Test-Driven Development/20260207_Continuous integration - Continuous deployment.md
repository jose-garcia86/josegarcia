# CI/CD: Continuous Integration / Continuous Deployment

Modern software development relies on thoroughly testing conde at multiple levels, including unit, integration, and end-to-end tests. While it’s possible to run these tests manually, the challenge is ensuring all tests are consistently run every time code changes. This is where **Continuous Integration (CI)** becomes invaluable.

**Continuous Integration (CI)** is the practice of automatically building and testing your code whenever developers push changes. Instead of delaying tests until the end of a project —risking late discovery of problems— CI provides immediate feedback, allowing teams to detect and fix issues quickly.

The core principle of CI is for developers to integrate their code into shared repository as often as possible, ideally multiple times per day. This approach contrasts with older models, where developers might work in isolation for extended periods before merging their changes. With CI, every merge triggers an automated build and test process. Results arrive within minutes, so if a problem is introduced, the team is alerted almost instantly. Early detection makes it much easier and less costly to fix issues.

A primary benefit of CI is avoiding “integration hell” —the scenario where numerous changes are merged simultaneously, resulting in conflicts and extensive bugs. Integrating and testing frequently allows teams to catch problems early, reducing both risk and development time.

**Continuous Delivery (CD)** and **Continuous Deployment** build on the foundation established by CI. Together, they are often referred to as **CI/CD**, representing the fully automated journey of code from a developer’s machine to production. Here’s how the CI/CD process typically works:

1. **Code Commit**: A developer pushes changes to a version controll system (like Git), triggering the pipeline.
2. **Automated Tests**: The pipeline runs the pre-configured suite of automated tests —unit, integration, and sometimes system tests— to validate the quality and functionality of the new code.
3. **Preparing a Release**: If all Tests pass, the pipeline builds a deployable artifact. In continuous delivery systems, this artifact is pushed to a staging or pre-production environment, ready for manual approval before deployment.
4. **Continuous Deployment**: For teams practicing continuous deployment, the code is automatically released to production as soon as it passes all automated tests, making features and fixes available to users immediately.

[[Captura de pantalla 2026-02-07 a las 21.14.37.png|1084]]

In this automated workflow, if a test fails, the problem can be addressed and committed promptly, maintaining a fast and reliable release pace.

Many tools are available to support CI/CD practices. Popular options include **Github Actions** and **Gitlab CI/CD**, which integrate directly with code repositories, as well as **CircleCI** (favored for its simplicity and **Jenkins** (known for its power and customizability).

In summary, CI ensures code is continuously tested and remains stable, while CD guarantees that code reaches users quickly and safely. Together, CI/CD underpin the speed, quality, and efficiency of modern software delivery. 
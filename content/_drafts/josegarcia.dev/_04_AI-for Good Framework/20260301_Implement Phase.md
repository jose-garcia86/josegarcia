# Implement Phase

Once you’ve looked at your data and designed your model strategy and your annotation strategy, figured out how you’re goint to do with data privacy and security and planned your user experience, then you’re ready to begin implementing your system.

In this phase, you’ll get ready for production by running any final training and testing of your model and moving it into a scalable production environment, where you’ll be concerned with monitoring your model performance and understanding potential failure modes, among other things. I’m just calling this productionize your model, which really just means making the model that you developed in a sort of testing environment in the design phase more availabe and reliable and robust as part of your production system and available for your end user application. And then, as you’re ready to put your model into the production environment and iterate and integrate your model there, you’ll be at a stage where you’re able to do end-to-end testing. So, look at everything in your system from one end to another in terms of data throughput, model monitoring and reliability, systems updates, and user experience.

For any project that you’re working in, to complete the implementation phase, you need to be able to answer two simple questions.

- Is your model performance acceptable?
- Are end users able to successfully use your system?

It’s possible you realize that there are problems with your model performance or usability of your system during the implementation phase, and you will need to return to the design phase and work out those problems. 

In a particular project, is likely to involve a whole lot of technical challenges, related things like system uptime, or low latency predictions, or retraining time,
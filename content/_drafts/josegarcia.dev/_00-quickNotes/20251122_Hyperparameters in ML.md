
# Understanding Hyperparameters in ML

Hyperparameters are settings or configurations that you set before the training process begins, which control the behaviour and performance of machine learning models. Unlike model parameters, which are learned from the data during training, hyper parameters are predefined and must be set manually. They play a crucial role in model performance and can significantly impact the results.

## Common Hyperparameters

1. **Learning Rate**: Controls how much to change the model in response to the estimated error each time the model weights are updated.
2. **Batch Size**: Determines the numer of training samples used in one iteration
3. **Number of Epochs**: Specifies how many times the learning algorithm will work through the entire training dataset.
4. **Regularization Parameters**: Help prevent overfitting by adding a penalty to the loss function.
5. **Momentum**: Accelerates the gradient vectors in the right directions, leading to faster converging.

## Importance of Hyperparameters

Setting the right hyperparameters is essential for model training because they directly influence the training process and the performance of the model. Proper tuning of hyper parameters can lead to better model accuracy, faster convergence, and overall improved results.

### Understanding Hyperparameters: Learning Rate

Learning Rate is a crucial hyper parameter in machine learning models that determines the step size at each iteration while moving towards a minimung of the loss function. It is common to use [scientific notation](https://en.wikipedia.org/wiki/Scientific_notation) for learning rates because they are often very small values. For example, a learning rate of *0.001* can be expressed as *1e-3*.
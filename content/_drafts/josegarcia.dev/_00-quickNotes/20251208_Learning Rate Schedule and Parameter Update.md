# Learning Rate Schedule and Parameter Update

In Machine Learning, particularly in training neural networks, managing learning rates and updating model parameters are essential tasks that significantly influence the model’s performance and convergence speed. 

## Learning Rate Schedule:

- **Learning Rate**: A hyperparameter that controls how much to change the model in response to the estimated error each time the model weights are updated.
- **Learning Rate Decay**: A technique to gradually reduce the learning rate during training. This helps the model converge more smoothly and avoids overshooting the minimum of the loss function.
- **Epoch**: One complete pass through the entire training dataset. Reducing the learning rate over epochs can improve training stability and model performance.

## Parameter Updates:

- **Model Parameters**: The weights and biases in a neural network that are adjusted during training to minimize the loss function.
- **Gradient**: The partial derivatives of the loss function with respect to the model parameters. They indicate the direction and magnitude of parameter updates.
- **Gradient Descent**: An optimization algorithm used to minimize the loss function by iteratively moving in the direction of steepest descent as defined by the gradients.
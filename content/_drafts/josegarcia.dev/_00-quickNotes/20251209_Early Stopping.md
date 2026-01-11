# Early Stopping

In Machine Learning, one of the critical aspects of training a model is ensuring that it generalizes well to new, unseen data. **Overfitting** occurs when a model learns the training data too well, including noise and outliers, which negatively impacts its performance on new data. To prevent overfitting, various techniques can be employed, and one such technique is **early stopping**.

**Early Stopping** is a method where the training process is halted when the model’s performance on a validation dataset stops improving. By doing so, we avoid over-training the model, thereby maintaining its ability to generalize well.  This is done by monitoring the validation loss over epochs.

## Two Methods

1. **Immediate Stop**: The training stops immediately when the validation loss increases compared to the previous epoch.
2. **Patience**: The training stops if the validation loss does not improve for a specified number of epochs, known as patience.
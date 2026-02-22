# Accessing and Deleting elements in Pandas Series

Now let’s look at how we can access or modify elements in a Pandas Series. One great advantage of Pandas Series is that it allows us to access data in many different ways. Elements can be accessed using index labels or numerical indices inside square brackets, [ ], similar to how we access elements in NumPy ndarray. Since we can use numerical indices, we can use both positive and negative integers to access data from the beginning or from the end of the Series, respectively. Since we can access elements in various ways, in order to remove any ambiguity to whether we are referring to an index label or numerical index, Pandas Series have two attributes, `.loc` and `.iloc` to explicitly state whatever we mean. The attribute `.loc` stands for *location* and it is used to explicitly state that we are using a labeled index. Similarly, the attribute `.iloc` stands for *integer location* and it is used to explicitly state that we are using a numerical index. Let’s see some examples:

## Example 1. Access elements using index labels

```python
# We access elements in Groceries using index labels

# We import Pandas as pd into Python
import pandas as pd

# We create a Pandas Series that stores a grocery list
groceries = pd.Series(data = [30, 6, 'Yes', 'No'], index = ['eggs', 'apples', 'milk', 'bread'])

# We use a single index label
print('How many eggs do we need to buy:', groceries['eggs'])
print()

# We can access multiple index labels
print('Do we need milk and bread: \n', groceries[['milk', 'bread']])
print()

# We use loc to access multiple index labels
print('How many eggs and apples do we need to buy:\n', groceries.loc[['eggs', 'apples']])
print()

# We access elements in Groceries using numerical indices:

# we use multiple numerical indices
print('How many eggs and apples do we need to buy:\n', groceries[[0, 1]])
print()

# We use a negative numerical index
print('Do we need bread:\n', grocesies[[-1]])
print()

# we use a single numerical index
print('How many')
```
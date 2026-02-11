# Why use Numpy?

```python
# Why use NumPy?
import time
import numpy as np
x = np.random.random(100000000)

# Case 1
start = time.time()
sum(x) / len(x)
print(time.time() - start)

# Case 2
start = time.time()
np.mean(x)
print(time.time() - start)
```

## Benefits of using Numpy

Even though Python lists are great on their own, NumPy has a number of key features that give it great advantages over Python lists. Below are a few convincingly strong features:

1. One such a feature is **speed**. When performing operations on large arrays NumPy can often perform several orders of magnitude faster than Python lists. This speed comes from the nature of NumPy arrays being memory-efficient and from optimized algorithms used by NumPy for doing arithmetic, statistical, and linear algebra operations.
2. Another great feature of NumPy is that it has **multidimensional arrays data structures** that can represent vectors and matrices. A lot of Machine Learning algorithms rely on matrix operations. For example, when training a Neural Network, you often have to carry out many matrix multiplications. NumPy is optimized for matrix operations and it allows us to do Linear Algebra operations effectively and efficiently, making it very suitable for solving Machine Learning problems.
3. Another great advantage of NumPy over Python lists is that NumPy has a large number of **oftimized built-in mathematical functions**. These functions allow you to do a variety of complex mathematical computations very fast and with very little code (avoiding the se of complicated loops) making your programs more readable and easier to understand.

These are just some of the key features that have made NumPy an essential package for scientific computing in Python. In fact, NumPy has become so popular that a lot of Python packages, such as Pandas, are built on top of NumPy.

## Good to read

You can read how to use NumPy for efficient computation, from the research article titled [The NumPy array: a structure for efficient numerical computation(opens in a new tab)](https://hal.inria.fr/inria-00564007/en) by Walt et. al., 2011. The article is available [here(opens in a new tab)](https://hal.inria.fr/inria-00564007/document).

## Supporting Official Resoource

If you are new to NumPy, we recommend you develop the practice of referring to the official [NumPy User Guide(opens in a new tab)](https://numpy.org/doc/stable/user/index.html), whenever you are looking for any *numerical* utility function.
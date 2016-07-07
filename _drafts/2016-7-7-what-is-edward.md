---
type: post
title: "What is Edward?"
---

From a quick read of the [GitHub repo README](https://github.com/blei-lab/edward), Edward is some kind of library on top of TensorFlow, Stan, PyMC3, or maybe custom Numpy code that uses TensorFlow on the back end.

    The [process](http://edwardlib.org/getting-started/) they describe sounds like typical probabilistic programming, with the exception of model criticism. Does Edward automatically adjust your model for you? 

The getting started guide starts off with this assignment:

```python
data = ed.Data(np.array([0, 1, 0, 0, 0, 0, 0, 0, 0, 1]))
```

Looking at the source code for the `Data` class, it stores the array, a location for the last accessed index, and the length of the array. It has one function called `sample`, which gets a certain amount of contiguous data from the data, unless it is shuffled (which isn't implemented yet).




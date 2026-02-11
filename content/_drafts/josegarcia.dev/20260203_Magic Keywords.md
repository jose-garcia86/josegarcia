# Magic Keywords

Magic keywords are special commands you can run in cells that let you control the notebook itself or perform system calls such as changing directories. For example, you can set up matplotlib to work interactively in the notebook with `%matplotlib`.

Magic commands are preceded with one or two percent signs `%` or `%%` for line magics and cell magic, respectively. Line magics apply only to the line the magic command is written on, while cell magics apply to the whole cell.

**Note**: These magic keywords are specific to the normal Python kernel. If you are using other kernels, these most likely won’t work.

## Timing Code

At some point, you’ll probably spend some effort optimizing code to run faster. Timing how quickly your code runs is essential for this optimization. You can use the `timeit` magic command to time how long it takes for a function to run, like so:

[[magic-timeit.png|882]]

If you want to time how long it takes for a whole cell to run, you’d use `%%timeit` like so:

[[magic-timeit2.png|874]]

## Embedding visualizations in notebooks

As mentioned before, notebooks let you embed images along with text and code. This is most useful when you’re using `matplotlib` or other plotting packages to create visualizations. You can use `%matplotlib` to set up `matplotlib` for interactive use in the notebook. By default, figures will render in their own window. However, you can pass arguments to the command to select a specific “backend”, the software that renders the image. To render figures directly in the notebook, you should use the inline backend with the command `%matplotlib inline`.

**Tip**: On higher resolution screens such as Retina displays, the default image in notebooks can look blurry. Use `%config InlineBackend.figure_format = ‘retina’` after `%matplotlib inline` to render higher resolution images.

[[magic-matplotlib.png|883]]

## Debugging in the Notebook

With the Python kernel, you can turn on the interactive debugger using the magic command `%pdb`. When you cause an error, you’ll be able to inspect the variables in the current namespace.

[[magic-pdb.png|869]]

Above you can see I tried to sum up a string which gives an error. The debugger raises the error and provides a prompt for inspecting your code.

Read more abou `pdb` in the [documentation](https://). To quit the debugger, simply enter `q` in the prompt.

## More reading

There are a whole bunch of other magic commands, I just touched on a few of the ones you’ll use most often. To learn more about them, here is the [list](https://) of all available magic commands.
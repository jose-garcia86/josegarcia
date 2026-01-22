# Python Environments

A virtual environment is a silo-ed Python installation apart from your main Python installation. That way you can install packages and delete the virtual environment without affecting your main Python installation.

Let’s talk about different Python environments managers: **conda** and **venv**. You can create virtual environments with either one. Below you’ll read about each of these environment managers including some advantages and disadvantages.

### Conda

Conda does two things: manages packages and manages environments. As a package manager, conda makes it easy to install Python packages especially for data science. For instance, typing `conda install numpy` will isntall the numpy package.

As an environment manager, conda allows you to create silo-ed Python installations. With an environment manager, you can install packages on your computer without affecting your main Python installation.

The command line code looks something like this:

```bash
conda create —name environmentname
source activate environmentname
conda install numpy
```

### Pip and Venv

There are other environmental managers and package managers besides Conda. For example, **venv** is an environment manager that comes pre-installed with Python 3. Pip is a package manager.

Pip can only manage Python packages where conda is a language agnostic package manager. In fact, conda was invented because **pip** could not handle data science packages that depended on libraries outside of Python. In you look at the [history of conda](https://) you will find that the software engineers behind conda needed a way to manage data science packages (Numpy, Matplotlib, etc) that relied on libraries outside Python.

Conda manages environments AND packages. Pip only manages packages.

To use **venv** and **pip**, the command look something like this:

```bash
python3 -m venv environmentname
source environmentname/bin/activate
pip install numpy
```

## Which to Choose?

Whether you choose to create environments with **venv** or **conda** will depend on your use case. Conda is very helpful for data science projects, but conda can make generic Python software development a bit more confusing.

If you create a conda environment, activate the environment, and the pip install a package, you will find the system installs. your package *globally rather than in your local conda environment*. However, if you create the conda environment and install pip simultaneously, you will find that pip behaves as expected installing packages into your local environment:

```bash
conda create —name environmentname pip
```

On the other hand, using pip with venv works as expected. Pip and venv tend to be used for generic software development projects including web development.
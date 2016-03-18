## Install and Configure Git

Using Homebrew, you can also install [Git](https://git-scm.com/), the version control system of choice among choosy developers. :neckbeard:

To get started, run the following command.

```
brew install git
```

Once it finishes, run the following command.

```
git --version
```

And you'll see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/34/git-version.png)

Like artists, programmers sign their work. Let's configure Git to sign your commits with your name and email address.

**WARNING:** Before running the following commands, replace `YOUR FULL NAME` and `YOUR EMAIL ADDRESS` with the name and email from [your GitHub account](https://github.com/settings/profile).

```
git config --global user.name 'YOUR FULL NAME'
git config --global user.email 'YOUR EMAIL ADDRESS'
```

Next, run this command to download and install some awesome Git colors, handy aliases for common Git subcommands, and extra Git configuration that'll make your life easier when connecting to GitHub from the command line.

```
curl -fsSL https://git.io/vgqFH | sh
```

We'll go over these later. For now, relish in your victory of making it this far in the setup guide. :tada:

### Global .gitignore

Now is a great time to install a [global .gitignore file](https://help.github.com/articles/ignoring-files/#create-a-global-gitignore) to and ignore some common files.

```
echo .DS_Store > ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
```

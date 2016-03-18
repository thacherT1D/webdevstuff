### Discover the `EDITOR` environment variable

Like most shells, Fish allows you to control the contents of its **environment variables**, which are a set of key-value pairs that can affect the way running programs behave. These environment variables are often set when a new shell starts so their contents are available throughout the entire duration of the shell's session.

When executed, many command line tools look up specific environment variables and use their contents as implicit input. For example, Git uses the `EDITOR` environment variable to open your preferred text editor when you forget to include a commit message.

Environment variables like `EDITOR` can be set in a shell's startup file. While Fish's startup file is handy, add the following settings.

```
# Atom
set -x EDITOR 'atom -w'
```

**TIP:** Environment variables, like `EDITOR`, must be written in all capital letters.

Save the file and you'll see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/31/editor-env-variable.png)

Now, relaunch the Terminal and verify these settings with the following command.

```
echo $EDITOR
```

**TIP:** When reading the content of an environment variable, it must be prefixed with a dollar sign `$`.

And you'll see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/32/editor-env-variable-2.png)

### Discover the `PATH` environment variable

Like most shells, Fish relies on the `PATH` environment variable to specify a set of directories where other commands can be found.

To see the contents of the `PATH` environment variable, run the following command.

```
echo $PATH
```

**TIP:** When reading the content of an environment variable, it must be prefixed with a dollar sign `$`.

And you'll see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/33/path-variable.png)

When you type a command that **doesn't** include a slash `/` character, these `PATH` directories are searched one after another. Once a file that matches the command is found, the searching stops and the corresponding file is run.

Notice the `/usr/local/bin` directory is listed before the following directories.

- `/usr/bin`
- `/bin`
- `/usr/sbin`
- `/sbin`

This means the `/usr/local/bin` directory has priority over all later searched directories.

Since Homebrew installs new commands to the `/usr/local/bin` directory, Homebrew-installed commands will be preferred over the pre-installed ones. In upcoming sections, you'll use Homebrew to install additional commands that override the pre-installed commands that come with Mac OS X.

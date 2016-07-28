# Install and Configure Atom

[Atom](https://atom.io/) is a hackable text editor for the 21st century.

To get started, [download Atom](https://atom.io/download/mac), unzip the archive file, and drag the app icon into your `/Applications` folder.

Once installed, use Spotlight to launch Atom by pressing the `Command` + `Spacebar` keys at the same time, typing the word "atom" into the search field, and then pressing the `Enter` key.

![](https://i.imgur.com/fuVq4T5.jpg)

Close all the open tabs by typing `Command` + `W`.

Next, navigate to the `Atom > Preferences` menu item by pressing the `Command` + `,` keys at the same time.

Under the **Settings** tab, change the following:

| Name                               | Value              |
|------------------------------------|--------------------|
| Show Indent Guide                  | :white_check_mark: |
| Soft Wrap                          | :white_check_mark: |
| Soft Wrap At Preferred Line Length | :white_check_mark: |

NOTE: you may also want to change the font family to "Menlo" and change the font size to be more readable.

Under the **Install** tab, install the following:

| Name                           | Type    |
|--------------------------------|---------|
| file-icons                     | Package |
| language-fish-shell            | Package |
| tomorrow-night-eighties-syntax | Theme   |

Under the **Themes** tab, choose either `Solarized Light` or `Solarized Dark`

When you're done, close the preferences tab by pressing the `Command` + `W` keys  at the same time.

## Consider Other Themes

You may prefer another theme such as "Tomorrow Night Eighties".  To try it out:

Under the **Install** tab, install the following:

| Name                           | Type    |
|--------------------------------|---------|
| tomorrow-night-eighties-syntax | Theme   |

Under the **Themes** tab, choose the following:

| Name                           | Type         |
|--------------------------------|--------------|
| Tomorrow Night Eighties        | Syntax Theme |


### Install the Shell Commands

You'll find it insanely useful to open files and directories into Atom from the Terminal.

To get started, select the `Atom > Install Shell Commands` menu item.

To verify Atom is wired up correctly, run the following command.

```
atom ~/Downloads
```

And atom will open and display the list of files in your downloads folder on the left.

## Atom Packages

There are two ways to install a package, using Atom or using the terminal.

**To install** a package via Atom:

1. Open up the settings panel with the shortcut `cmd` + `,`.
2. On the left navbar click `Install`.
3. Search for the package you would like and click install.

**To install** a package via terminal, use the `Atom Package Manager` command:

```bash
apm install <package-name>
```

>**NOTE:** depending on how you previously installed Atom, you may need to add the `apm` command to your path in order to use it.

You can quickly search for packages [here](https://atom.io/packages).

**Step One:** Install the following plugins:

- [atom-beautify](https://atom.io/packages/atom-beautify) - this package allows us to rapidly format our code using the shortcut `cmd` + `option` + `b`.
- [linter-jshint](https://atom.io/packages/linter-jshint) - **NOT**`linter-jslint`. Lints all `.js` files.
- [linter-htmlhint](https://atom.io/packages/linter-htmlhint) - Lints all `.html` files.
- [linter-csslint](https://atom.io/packages/linter-csslint) - Lints all `.css` files and css in `.html` files.
- [linter-jsonlint](https://atom.io/packages/linter-jsonlint) - Lints all `.json` files.

**Step Two:** Some of our linters need configuration as well.

`linter-jshint` and `linter-htmlhint` rely on having configuration files to define rules for what the linter considers good or bad. Let's save some configs in our home directory:

```bash
cd #navigate to home directory
curl https://gist.githubusercontent.com/JordanMajd/9452f438cb48def55a647f7e48e1bdf9/raw/1fd88bd866e359a369ad61cbbcffbcec22c4c22c/.jshintrc > .jshintrc #download and save .jshintrc
curl https://gist.githubusercontent.com/JordanMajd/122409a4e130f7e45c34a59cfc668dd7/raw/00ff634c3c66204056ee448d0ee85b3c6072e6e6/.htmlhintrc > .htmlhintrc #download and save .htmlhintrc
```

**Step Three:** In order for the linter to read the config files, Atom must be restarted : `ctrl` + `option` + `cmd` + `l`.

**Resources:**
- [Atom Packages](https://atom.io/packages)

---

## Next Steps

Now you are ready for the [Terminal](Terminal.md)

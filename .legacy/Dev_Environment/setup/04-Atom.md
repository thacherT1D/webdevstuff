## Install and Configure Atom

Now it's time to install [Atom](https://atom.io/), a hackable text editor for the 21st century.

To get started, [download Atom](https://atom.io/download/mac), unzip the archive file, and drag the app icon into your `/Applications` folder.

Once installed, use Spotlight to launch Atom by pressing the `Command` + `Spacebar` keys at the same time, typing the word "atom" into the search field, and then pressing the `Enter` key.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/20/atom.jpg)

Close all the open tabs by pressing the `Command` + `W` keys at the same time.

Next, navigate to the `Atom > Preferences` menu item by pressing the `Command` + `,` keys at the same time.

Under the **Settings** tab, change the following:

| Name                               | Value              |
|------------------------------------|--------------------|
| Font Family                        | Menlo              |
| Font Size                          | 18                 |
| Show Indent Guide                  | :white_check_mark: |
| Soft Wrap                          | :white_check_mark: |
| Soft Wrap At Preferred Line Length | :white_check_mark: |

Under the **Install** tab, install the following _optional_ packages:

| Name                           | Type    |
|--------------------------------|---------|
| file-icons                     | Package |
| language-fish-shell            | Package |
| tomorrow-night-eighties-syntax | Theme   |

Under the **Themes** tab, choose the following:

| Name                           | Type         |
|--------------------------------|--------------|
| Tomorrow Night Eighties        | Syntax Theme |

When you're done, close the preferences tab by pressing the `Command` + `W` keys  at the same time.

### Turn on **autosave**

Under **Settings** do the following:

- Go to Packages
- Search for `autosave`
- Click on Settings
- Check "Enabled"

Now whenever you tab off of Atom your files will be saved automatically.

### Install the Shell Commands

You'll find it insanely useful to open files and directories into Atom from the Terminal.

To get started, select the `Atom > Install Shell Commands` menu item.

To verify Atom is wired up correctly, run the following command.

```
atom ~/Downloads
```

And your Downloads folder will open and look like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/21/atom-example.png)
![Uploading file...]()
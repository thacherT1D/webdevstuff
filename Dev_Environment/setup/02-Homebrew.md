## Install Homebrew

Now that your Terminal is setup, it's time to install [Homebrew](http://brew.sh/), the de facto package manager for OS X. If you've never heard of a package manager, think of it as an app store for **free** command line programs.

To get started, run the following command in your shell. It'll download and run a script file that downloads and installs Homebrew onto your development environment. So meta! :metal:

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Be sure to agree when asked to install the **Xcode CommandLine Tools**. It may take about 10 minutes to download and install.

**TIP:** If needed, you can agree to the Xcode license by running the `sudo xcodebuild -license` command. This will require your account password which **will not** appear on the screen as you type.

### Update Homebrew

If you've previously installed Homebrew, now's a good time to update it by running the following command.

```
brew update
```

If it's been a while since the last update, you'll see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/14/brew-install.png)

Otherwise, you'll see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/15/brew-up-to-date.png)

**TIP:** Run this command periodically as Homebrew doesn't automatically update itself. :sweat:

### Verify Homebrew

To verify Homebrew is installed correctly, run the following command.

```
brew doctor
```

And you'll see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/16/brew-doctor.png)
![Uploading file...]()
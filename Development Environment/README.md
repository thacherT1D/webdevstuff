## Mac OS X for Web Development

This article will help you setup a web development environment on [Mac OS X 10.11 El Capitan](https://www.apple.com/osx/) and above. By the end, your computer will be configured with the same state-of-the-art tools used by professional web developers.

## Prereqs

This article assumes your computer is up to the task of coding.

- Is virus and malware free
- Uses the latest, stable version of its operating system
- Has a functioning screen, keyboard, and trackpad
- Has plenty of free hard drive space and memory
- Can reliably connect to wireless networks

## Objectives

By the end of this article, your development machine should have the following software installed and configured:

- [Chrome](Chrome.md) - A Web Browser
- [Slack](Slack.md) for communication
- [Atom](Atom.md) - A Text Editor
- [Terminal](Terminal.md)
- A nice shell - one of:
  - [ZSH](Shells/ZSH.md) OR
  - [Fish](Shells/Fish.md)
- [Homebrew](Homebrew.md) - A Package Manager
- [Git](Git.md) - A Version Control System
- [Node](Node.md) - A JavaScript Environment
- [Environment Variables](Environment Variables.md) for productivity
- [A Window Manager](Window Managers.md) for quickly moving windows around
- [Password Manager](Password Manager.md) to securely store passwords
- [Optional Additional Tools](Additional Tools.md) if you want to geek out
- [Workspace Folder](Workspace.md) for organization
- [Deploy a Web App with Surge](Surge.md)

Finally you'll have a chance to learn some [Essential Keyboard Shortcuts](Keyboard Shortcuts.md)

After you've finished setting up your development environment, you'll be able to complete the following tasks.

1. Create a tiny web page with a text editor
1. Test the web page in a browser
1. Commit the web page to a repository
1. Deploy the web page to a production environment with [Surge](Surge.md)

### What's an environment and why is it important?

In software, an **environment** is the place where an application is executed. An application's environment includes things like an operating system and a runtime system. Although web applications are often executed on many different environments, each with their own purpose, two environments are essential—production and development.

A **production environment** is a server, or collection of servers, that live somewhere on the Internet and is responsible for serving the web application to the public. When you visit https://duckduckgo.com/ in the browser, for example, you're making a request to a web application's production environment. Production environments are carefully configured and designed to process user requests as quickly as possible.

A **development environment** is a machine, like your laptop, that's used to create, test, commit, and deploy code to the production environment. For consistency, it's important that a development environment use the same technologies as its production counterpart. However, unlike production, a development environment is all about increasing developer productivity. As you can imagine, being able to create a development environment is a crucial skill for every developer.

### How do you create a development environment?

There are four essential tasks that web developers do on a daily basis.

1. **Write code** as efficiently as possible
1. **Test code** to ensure it works as expected
1. **Commit code** to a repository once it's correct
1. **Deploy code** to a production environment

Many developers prefer a development environment composed of multiple specialized tools rather than one monolithic tool called an IDE (Integrated Development Environment). This approach is called the **Unix philosophy** and it emphasizes using simple, short, clear, modular, and extensible tools that can be easily maintained and repurposed by developers other than its creators. Though each tool has it's own learning curve, any one of them is easily replaceable when the need arises.

The following instructions will help you install and configure a development environment so you can complete the essential tasks of a web developer using tools that adhere to the Unix philosophy. Let's get started.

---

## Next Steps

Get started by [Installing Chrome](Chrome.md)

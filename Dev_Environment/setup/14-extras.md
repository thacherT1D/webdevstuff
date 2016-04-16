### Alfred (Spotlight	Replacement)

**What is it? What will I be using it for?**

Alfred is a wonderful tool for quickly finding files, doing quick math, searching on wikipedia and defining words.

**How do I install it?**

http://www.alfredapp.com/

### fasd

**What is it? What will I be using it for?**

When you're in the command line, sometimes you can't remember where folders/files are, so you spend time searching through directories and driving yourself crazy. fasd will help preserve your sanity.

https://github.com/clvv/fasd

**How do I install it?**

Download the zipfile here and open up the folder in terminal (you can drag the folder icon to the terminal)

https://github.com/clvv/fasd/zipball/1.0.1

Once you are in terminal, run the command `make install`

When this is done head over to the home directory (in terminal type `~`) and then run `subl .zshrc` to open up your `.zshrc` file. Inside of here, add the following `eval "$(fasd --init auto)"` - then save and restart the terminal. Finally, type in the terminal `which z`. If you see `z: aliased to fasd_cd -d` you have done this correctly!

### tree

**What is it? What will I be using it for?**

Tree is a very useful tool for looking at the contents of a folder from the command line. It gives you a nice tree-like structure and shows you what files are nested where.

**How do I install it?**

http://brewformulas.org/Tree

`brew install tree`

### Mou

**What is it? What will I be using it for?**

When we write readme files for our repositories, the language we use is Markdown, which is a text to HTML converter (you can read more about it here http://daringfireball.net/projects/markdown/). It's essential to understand how Markdown works as well as have a tool where we can write Markdown. Sublime Text 3 can help us with that, but there are better tools - Mou is one of them!

**How do I install it?**

http://25.io/mou/
![Uploading file...]()
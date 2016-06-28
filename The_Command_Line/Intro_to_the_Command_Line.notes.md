### Technical Terms

Users vs Groups
> Individuals versus a group of individuals

Root Directory vs Home Directory
> Root Directory is the directory with no parent; Home is for an individual user.

Tree
> A way to structure data. Your file system is in a tree.

Wildcard Character
> A way to represent... anything! Typically we use an asterisk to denote the wildcard character.

### grep Challenges

1. List all books that were written by "Dan Brown"
  `cat books.txt | grep "Dan Brown"`

1. Using a single command, create a new file called `sorted_books.txt` that contains a list of the books in `books.txt` by sorted by title.
  `cat books.txt | sort > sorted_books.txt`

1. Using a single command, create a new file called `george_orwell_books.txt` which should only contain those books by George Orwell, sorted by title.
  `cat books.txt | grep "George Orwell" | sort > george_orwell_books.txt`

**CHALLENGE**

Create a new file called `authors.txt` which lists only the authors of the books, alphabetized by first name. The list should be unique (i.e. Dan Brown is not listed twice) and should be numbered.

`cat books.txt | grep -o "by.*" | grep -o  " .*" | sort -u | grep -n ".*"`

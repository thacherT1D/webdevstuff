## Student Interview Assessment

See also:

- https://github.com/gSchool/outcomes-curriculum
- https://github.com/gSchool/sf-interview-questions
- https://github.com/gSchool/interview-questions
- https://github.com/gSchool/g10-interview-questions
- https://github.com/gSchool/MEAN-stack-interview-style-blog


Kyle Coberly built an app for this:

- https://github.com/gSchool/mock-interview-app-api
- https://github.com/gSchool/mock-interview-app


<i>The purpose of this document is to maintain a source of reference for various coding and technical interview questions. Instructors use these examples to interview full-stack students. Also please contribute examples and questions.</i>

<hr>

## Student Interview Assessment (Instructor Guide)

#### 4 Areas to consider

- How well they asked questions
- How well they checked assumptions / inputs / outputs
- How well they approached the problem itself
- How well they checked their work
* score each area 1 to 4

###### Scoring Guidelines

- [1] - total failure
- [2] - emerging - showed some good signs, but not all the way there
- [3] - nailed it
- [4] - epically crushed it.  Very few people will ever get this.

#### >> Important!

The purpose of these interviews is three-fold:

  * prepare students for interviews
  * build better relationships w/ students and lower their stress levels.  Get to know them better
  * increase their overall satisfaction with the program

These interviews shouldn't be high-stress times to tear students down, but rather a supportive time to help them grow.

#### 1. Questions Students should ask

  * Real code or pseudo code?
  * What language would you like it to be in?
  * What types of inputs and outputs should we have?
  * Can I use the __ method from this language?

##### 2. Checking assumptions

  * e.g.: "OK, so if you give me ____, then my method should return ___"

##### 3. Solving code

Lots of strategies here, such as:

  * divide and conquer
  * find a similar algorithm
  * base case and build

What you are looking for here is that they have _some_ kind of problem solving technique - it's not just random.


##### 4. Checking your work

  * step by step walk through of code to check for understanding
  * write out each variable during each iteration etc...


<hr>

### Simple Coding Tests
  - Find the most frequent integer in an array.
  - Find pairs in an integer array whose sum is equal to 100.
  - Given 2 integer arrays, determine of the 2nd array is a rotated version of the 1st array.
  - Write fizz buzz iteratively and recursively.
  - Write fib iteratively and recursively.
  - Find elements in an array that only occur once.
  - Find the common elements of 2 arrays.
  - Iterate an array of objects and tally like keys to a single output object.
  - 
```
// example data
    Input = [
      {year: 1999, movies: 10},
      {year: 1998, movies: 10},
      {year: 1999, movies: 10},
    ]

    Output = {
      1999: 20,
      1998: 10
    }
```

  - Find the first non-repeated character in a String.
  - Determine if 2 Strings are anagrams.
  - Check if String is a palindrome.
  - Check if a String is composed of all unique characters.

<hr>

#### Technical Questions
  1. What is the CSS Box Model?
  - In Javascript, what's the difference between == and ===?
    * What is a situation I could get in trouble by using == instead of === ?
  - In Javascript, how do you fetch an element by it's id?
  - What's your favorite way to make an ajax call?
    * I want to do something after two Ajax calls have both completed, but not before. How can you do this?
  - Design an inventory system for a car dealership:
    * How do you manage each parking space
  - Hotel Reservation system:
    * “I’m the marketing manager and I want to apply a 20% discount per room if somebody books it between X and Y date, how do you architect that?"
   * “Ok, how does this model change if I introduce rooms with a king size bed?"
   * What if the room is booked for more than the discount period? you now need to break it out and price it by day based on the discount, etc
   * Imagine we are building a conference room booking application, and the idea is that a key component to the app will be its ability to calculate the average number of hours per day it's booked.
  - How would I build Twitter?
    * What classes they would define.
    * What methods go in each class (including signatures).
    * What the class constructors are responsible for.
    * What data structures the class will have to maintain.
    * Whether any Design Patterns are applicable to this problem.
  - SaaS App
    * You are building a task management / productivity app where users can add tasks and wireframes, and comment on both. The scenario is:
    * Tasks are a part of projects
    * Projects are a part of customer accounts
    * Users can be invited to several projects, in any customer account
    * Some users can administer projects (add other users etc...), while others can only work in the project
    * Each customer account can be managed by one or more users
  - Hospital (medical appointment software does the following):
    * Patients schedule meetings with doctors
    * Doctors work in sometimes 1, sometimes 2 or 3 hospitals
    * All doctors and patients need to be able to login
    * There's a master list of all medications
    * Doctors prescribe medications for patients
    * How would you model this?
  - Social network (software does the following:)
    * People can request friends, and friends can accept or deny
    * Users can post status updates
    * Users can upload photos and manage photo albums
    * Users can comment on posts
    * Users can comment on photos
    * Users can like posts, comments and photos
    * Users can view all of their activity on the website
  - Deck of cards
    * Design a deck of cards that can be used for different card game applications.
    * Likely classes:
```
a Deck
a Card
a Hand
a Board
```
   * Drill down on who's responsible for creating new Decks, where they get shuffled, how you deal cards, etc.
   * Questions:
     * Do you need a different instance for every card in a casino in Vegas?
  - FileSystem
    * Create a class design to represent a filesystem.
```
Filesystem
Directory
File
Permission
```
    * Questions:
      * What's their relationship?
      * How do you differentiate between text and binary files, or do you need to?
      * What about executable files? How do they model a Directory containing many files?
      * Do they use a data structure for it? Which one, and what performance tradeoffs does it have?
  - HTML
    * Design an OO representation to model HTML.
    ```
    Nodes
    Attributes
    Children and parent pointers
    ```
  - OO Design Interview Questions
    * Design a parking garage.
    * Design a bank of elevators in a skyscraper.
    * Model the monorail system at Disney World.
    * Design a restaurant-reservation system.
    * Design a hotel room-reservation system.
    * SurveyMonkey / Google Forms
  - Survey Tool
    * Admins can design surveys, with questions of the following types:
      * text field questions
      * dropdown questions that require a single answer
      * multiselect questions that allow users to select multiple answers
      * date questions
      * date range questions
      * numeric questions
      * single checkbox questions
      * checkbox list questions that allow users to select multiple boxes
      * Likert scale questions
      * Some questions depend on the answers to other questions
        * For example: "if a user answers yes to this question, show these other two questions"
      * Anonymous users can take surveys
      * Logged in users can take surveys
      * Admins should be able to quickly answer questions like:
        * How many users selected option A and option C from a multiselect question?
        * How many people answered a date range question where their start date / end date includes 2014-05-04?
        * What was the average of all of the answers to a numeric question?
  - In-app messaging system
    * Users can send messages to one or more other users
    * Other users can reply to that thread
    * Users can add other users to the conversation, or remove users
  - CRM (You are building a CRM. It tracks people and organizations)
    * Users can manage people
    * Users can manage organizations
    * Users can create relationships between people (friend of, employer of etc...)
    * Users can create relationships between people and organizations
    * Some relationships between people and organizations need extra data - for example:
    * users should be able to define an "employment" relationship type, that has job title, start / end dates
    * users should be able to define a "volunteer" relationships type, which has things like t-shirt size or location
    * Users can create relationships between organizations (for example if organizations have chapters, or different offices)
    * Users can comment on both people and organizations
    * Users can add multiple addresses, emails and phone numbers to both people and organizations
    * can cover:
      * polymorphic associations
      * self-referential joins
      * Some questions are things like:
    * Single tenant or multi-tenant app
      * Are the org / chapter relationships hierarchical or more of a graph?
      * For the org / person relationships, hStore or fully modeled out?
  - Apartment Rentals
  - Time-based
    * Units / people who fill units for a certain amount of time at a certain rate
    * Have things like maintenance logs, account for when it was empty
  - Airline Analytics
    * Imagine you run an airline. You want to see how much money you have in profit in the air at any given point.
    * You want to see a map, where airplanes appear as lines on the map from one city to another, and on each line you see three numbers: income, expense and net for the flight.
  - Model a card game
    * e.g.: Go fish or texas hold'em poker
  - Model a sports team
    ```
    Coaches
    Players
    ```
  - Model a public elementary school
    ```
    Teachers
    Students
    Classrooms
    ```
  - Model a restaurant
    ```
    Tables
    Servers
    Reservations
    ```
  - Model an apartment building:
    * Users want to be able to see a list of the apartments on all floors
    * Users want to be able to see details about an apartment, such as # of bedrooms, # of bathrooms and square footage
    * Users want to be able to see which apartments are vacant
    * Users want to be able to see a list of all tenants listed on every lease (current and previous) for an apartment
    * Users want to be able to see a list of rent checks, when they were received and deposited, for which leases
    * Users want to be able to see how much each apartment has made
    * Users want to be able to see the total amount of money they've taken in for a given lease

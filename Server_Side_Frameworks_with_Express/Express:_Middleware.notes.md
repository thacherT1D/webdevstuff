#Standards Supported:

- Build CRUD apps in Express

#Objectives:

- Describe what middleware is and its role in Express
- List the three parameters that every piece of middleware is passed
- List two examples of middleware
- Use Body Parser to handle POST request

#Topics:

- What is middleware?
- How does it tie into express?
- What are some examples we've already used?
- Two more important ones:
  - Method Override
  - Body Parser
- Make simple express app with a create route for a scaffolded resource (have sql file to build schema)

#Exercises

- https://github.com/micah-eberhard/middleware_exercise




#Direction >>

1.   Explain the idea of middleware. It allows you to chain many possible actions onto specified requests.
2.   Have students talk with their tables and come up with two examples of middleware we've already used.
3.   Explain that almost everything in express is actually middleware. All the routes etc... Order matters.
4.   Have students pair up and whiteboard a simple function which console.logs "It's dead Jim!" any time any route would get hit.

5.   Students should fork and clone the exercise repo.
6.   Step through each section as they add it into their app.
7.   Release students to continue with the exercise instructions.

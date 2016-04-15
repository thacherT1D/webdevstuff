# Stack

A stack is a "last in, first out" (LIFO) data structure. This means that when you add something to a stack, it will be the first item to be accessed unless something else is added first. Think of this like a stack of trays in a cafeteria. This is an efficient data structure for when you only need to work with the top element in a collection.

![Stack](https://s3-us-west-2.amazonaws.com/learning-experience-assets/data_structures_and_algorithms/stack_diagram.jpg)

Stacks have two essential operations:

* push(), which adds an item to the top of the stack
* pop(), which removes the top item from the stack

![Stack](https://s3-us-west-2.amazonaws.com/learning-experience-assets/data_structures_and_algorithms/stack_push_pop.png)

Some stacks will also have extra operations:

* peek(), which shows you the top of the stack without removing it
* length(), which returns the number of items in the stack
* clear(), which removes all items from the stack

Internally, a stack would probably also have a `top` property that indicates what the current top index is. A JavaScript implementation might look like this:

```
function Stack(){
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
    
    function push(element){
        this.dataStore[this.top++] = element;
    }
    
    function peek(){
        return this.dataStore[this.top - 1];
    }
    
    function pop(){
        return this.dataStore[--this.top];
    }
    
    function clear(){
        return this.top = 0;
    }
    
    function length(){
        return this.top;
    }
}
```

The cafeteria trays example might look something like this:

```
    var cafeteriaTrays = new Stack();
    
    cafeteriaTrays.push("First Tray");
    cafeteriaTrays.push("Second Tray");
    cafeteriaTrays.push("Third Tray");
    
    cafeteriaTrays.peek(); // "Third Tray"
    cafeteriaTrays.length(); // 3
    
    cafeteriaTrays.pop(); // "Third Tray"
    cafeteriaTrays.pop(); // "Second Tray"
    
    cafeteriaTrays.clear();
    cafeteriaTrays.length(); // 0
```

Here are some problems that are solved using stacks:

* Checking to see if a string is a palindrome
* Checking to see if text is "balanced" (opening/closing quotes, parentheses, etc.)
* The [Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
* Backtracking through an order of events
* Call stacks

Stacks are also used as parts of some algorithms, such as searches.

Do the exercise in [Galvanize Call Stack](https://github.com/gSchool/galvanize-callstack) to practice!
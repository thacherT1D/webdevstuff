## Objectives

By the end of this article you will be able to:

- Discuss the basic function and purpose of promises.
- List the three states of a promise.
- Refactor code from callbacks to make use of promises.
- Understand how to chain and handle errors using promises.
- Use promise.all to handle multiple asynchronous operations simultaneously


## Async Review

Before jumping into promises, it is very important to understand the asynchronous nature of JavaScript. Imagine if your application had to wait for one event to finish before it could start another. What kind of problems could that lead to? What would the user experience be like?

## What are Promises?

Promises show up pretty much everywhere in JavaScript these days, including interviews.  Having total mastery over promises will allow you to write clean and beautiful, well-factored asynchronous code.

These exercises predominantly use Monk to demonstrate promises because it's so lightweight / quick and easy.  But the exact same principles and techniques would apply if you were reading files, making API calls or making any other async calls that return promises.

Example:

```javascript

get('http://pokeapi.co/api/v2/pokemon/1/')
  .then(function(data){
    return get(data.abilities[0].ability.url);
  })
  .catch(function(error){
    console.error('Could not make GET request, an error has occurred,' error);
  })

function get(url){

  return new Promise(function(resolve, reject){

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.onload = resolve;
    xhr.onerror = reject;

    xhr.send();
  });
}
```


## Exercise

- [Promises ES6 Exercise](https://github.com/gSchool/promises-es6)
- [Promise Exercise](https://github.com/gSchool/promise-exercise)


### Promises Resources

- [MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Lesson Slides](https://docs.google.com/presentation/d/1ehfrCZ9hpc601dkfXUz7TzrDpSOn_VHuKflOumTasVI/edit?usp=sharing)

#### Promise Repos:

- [Github: Promise All](https://github.com/gSchool/promise-all)
- [Github: Promise Challenges](https://github.com/gSchool/promise-challenges)
- [Github: Promise Examples](https://github.com/gSchool/js-promise-examples)
- [Github: Spotify Promise Example](https://github.com/gSchool/spotify-promises-example)
- [Github: Promises Practice](https://github.com/gSchool/post-assessment-promises-practice)

- [Github: Express Error Handling w/ Promises](https://github.com/gSchool/error-handling-in-node-express-promises)


### Vimeo Promise Videos

<iframe src="https://player.vimeo.com/video/136801594?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<iframe src="https://player.vimeo.com/video/136900546?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Event Loop

- [Vimeo: Event Loop Video](https://vimeo.com/134061121) - password is schoolhouserock
- [MDN: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Youtube: Event Loop Video](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Loupe: Event Loop Visualizer](http://latentflip.com/loupe/)

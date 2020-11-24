# Part 6


## Exercise 6.1

Did this using the TDD approach, with an iteration for each action, each of which had the following steps:

 - Write the unit test.
 - Run tests. At least the newly written one will fail
 - Implement the part of the reducer to make the test pass.
 - Run tests. Make corrections to the reducer and repeat till all tests pass.

Also, to maintain the functional paradigm of programming, I have used [lodash](https://lodash.com/) which is a popular library that, among other things, provides many utility functions to perform various operations that adhere to the functional programming paradigm, that too in a performant manner. I could have used the spread operator to copy the state object with just one property updated to modify the count of good/ok/bad properties but that would only make a shallow copy. In this case, a shallow copy would suffice but this would not be a good solution if we, at any point, have to introduce even one level of nesting. So, I used the defaultsDeep function of lodash to allocate a new object using the existing `state` object and return that in the `counterReducer`.


## Exercise 6.2

All I had to do here was to assign an event handler for `onClick` events of each of the buttons and display each count from the state. Rest was taken care of.


## Exercise 6.3

Implemented the functionality with some difficulty, the difficulty was as follows:

At first, I was logging the state after a vote button was clicked, but the state did not record any vote. Confused by this, I used a `useState` hook in the `Anecdotes` component to store the vote count, I can just increase that and call the `dispatch` function to make the change in the state as well and to re-render at least that one component with the updated votes count. Then, on the front-end, the count was increasing but the same was not reflecting in the logged state. After about an hour of struggling with this, I realised that I was, by mistake, mutating the state without returning a fresh one in the reducer. Once I fixed this, it worked fine.

So, although in the submission commit, the implementation may be botched, but I fixed it in the finished product (which is what the course cares about).


## Exercise 6.4

Added form to add new anecdotes, using `textarea` instead of `text`.


## Exercise 6.5

In the callback given to the `useSelector` hook, I created a copy of the state array, sorted it and returned it. Fairly simple.


## Exercise 6.6

Already did this, nothing to add.

## Exercise 6.7

Already did this, nothing to add.

## Exercise 6.8

Already did this, although the name of my component was `AnecdoteContainer`, so I simply changed the name.



---
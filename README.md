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

---
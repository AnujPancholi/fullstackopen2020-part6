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

## Exercise 6.9

Installed redux dev tools. Moved the redux store to store.js and imported the same in the index.js file.

## Exercise 6.10

Made the necessary changes, with different action creators for showing and hiding the notification as recommended

## Exercise 6.11

Made functions to display the notifications for 5 secs on new anecdote creation and on upvoting an anecdote.

## Exercise 6.13

Setting up the json-server dependency to use a json file was easy, then, I made a file `services/anecdotes.js` for the sole purpose of communication with the backend for anecdote-related operations. Used that file in the `AnecdoteList` component to fetch the data and invented an action of type `ANECDOTE_POPULATE_ALL` in the anecdote reducer to set the state with the fetched data (created an action creator for the same).

Also, I found it necessary to add another property to the state, `anecdotes_is_loading` which is a boolean that would indicate if the anecdote data is being loaded from the backend or not. If this is set, then the `AnecdoteList` component would simply show "Loading..." instead of nothing (which would indicate absence of anecdotes). So, each time the data is fetched, first `anecdotes_is_loading` is set to `true`, and one the API responds, it is unset to `false`.

## Exercise 6.14

First step was to add a function in the `anecdotes` service to make the POST request to create an anecdote on the backend. Votes were initialized with 0 on the frontend, however, `json-server` does me the courtesy of creating a randomly generated ID which it returns in the newly created document (or what would be a document in MongoDb). Then the state could simply be updated with the new anecdote with the existing action and slightly modified action creator.

## Exercise 6.15

Made an async action creator that, in the async funtion that it returns, calls `dispatch` with the existing action creator. Works fine, and the logic if fetching the data from the `anecdotes` service is shifted to the reducer file.

## Exercise 6.16

Did the same thing for the creation of new note, however, since we have to show the notification as well (for which I made a function), I have passed that function as a param as well which is in turn called when the creation operation is successful.

## Exercise 6.17

Made a function to record upvote via a PUT request on in `anecdotes` service, made an action creator in the reducer file to use the function to record upvote. Passed the function to show the nofication as a parameter just like the last exercise.

**NOTE:** In `json-server`, I tried to find a way to increment the value of votes by 1, alas, I discovered I have to pass literally all the data in the updated document except the `id`, therefore, there will be a race condition here, wherein if two people on different browsers upvote at the same time, only 1 upvote will be recorded. 

## Exercise 6.18

Made an acton creator function for this purpose and used the same for showing the two notifications. This eliminated the need for the function to show notification passed as a parameter to the async action creators for voting and new anecdote creation functionalities. Note that this action creator is being called form within the `anecdoteReducer` file by the other action creators.

## Exercise 6.19

Fairly easy to do, and does away with the user of hooks of `react-redux` and uses `connect` entirely.

## Exercise 6.20

Same as above exercise, however, there wasn't really anything from the redux store here, so had to pass a `mapStateToProps` function that returns an empty object.

## Exercise 6.21

This one was a bit tricky. I would need the id returned by `setTimeout` somewhere if it was to be cleared for the new timeout, so I made another property for it in the state. Made a reducer for that, in which the action of type `NOTIFICATION_CLEARTIMEOUT` would clear whatever timeout id was stored in the state property `notification_id` (and even if that is not a valid timeout id, it would not throw an error) and an action of type `NOTIFICATION_SETTIMEOUT` would set the timeout id in the state that its action creator receives as an argument. Then, within the async action creator `getShowNotificationActionAsync` that actually creates the actions to show the notifications, I dispatch the action creators to first clear the timeout, and then set it again to hide the new notification, which solves the problem.

Two things to note here:

 - Inside the function returned by `getShowNotificationActionAsync`, the order of initiating the various action via `dispatch` was initially *clear timeout*->*set notification*->*set timeout*. However, the set timeout action was resetting the notification message back to its initial value immediately and the message was never shown, which was odd, considering I had made a different reducer altogether to manage the `notification_message` property and the reducer called by this action was different. After more than an hour os struggling, I changed the order to *clear interval*->*set timeout*->*set notification message* and the issue was solved. I'm not entirely sure what that was.
 - According to the redux docs, a reducer function should always be a pure function, but seeing as I would have to use the function `clearTimeout` on the state proprety to clear the timeout, I thought I would have to violate that. Instead, I passed the global `clearTimeout` as a parameter in the `action` object, and called that, however, I was getting an "Illegal Invocation" error. I found a solution for that where I am binding the function to the `window` object's context (which from what I know if basically global in a browser environment) and used that. I'm not sure if that's cheating but it works fine.
 
   
---
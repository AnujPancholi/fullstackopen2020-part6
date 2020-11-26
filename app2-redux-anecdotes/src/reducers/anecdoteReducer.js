import _ from "lodash";
import { combineReducers } from "redux";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = {
  anecdotes: anecdotesAtStart.map(asObject),
  notification_message: ""
}




const anecdoteReducer = (state = initialState.anecdotes, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case "VOTE_UP":
      
      const updatedState = _.map(state,function(obj){
        return _.defaultsDeep({
          votes: obj.votes + (obj.id===action.id ? 1 : 0)
        }, obj)
      })
      console.log("UPDATED STATE:",updatedState)
      return updatedState;
    
      case "ANECDOTE_NEW":
        return state.concat(action.data);
    default:
      return state;
  }
}

const notificationMessageReducer = (notificationMessage = initialState.notification_message,action) => {

  switch(action.type){
    case "SHOW":
      return action.message;
    case "HIDE":
      return "";
    default:
      return "";
  }

} 

//action creators
const getUpvoteAction = (id) => {
  return {
    type: "VOTE_UP",
    id: id
  }
}

const getNewAnecdoteAction = (text) => {
  return {
    type: "ANECDOTE_NEW",
    data: {
      id: getId(),
      content: text,
      votes: 0
    }
  }
}

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification_message: notificationMessageReducer
  
})

export default reducer

export {
  anecdoteReducer,
  getUpvoteAction,
  getNewAnecdoteAction
}
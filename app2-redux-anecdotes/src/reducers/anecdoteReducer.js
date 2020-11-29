import _ from "lodash";
import { combineReducers } from "redux";



const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = {
  anecdotes: [],
  anecdotes_is_loading: false,
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

    case "ANECDOTE_POPULATE_ALL":
      return action.data || []

    default:
      return state;
  }
}

const anecdoteLoadingReducer = (state = initialState.anecdotes_is_loading, action) => {

  switch(action.type){
    case "ANECDOTE_LOADING_SET":
      return true;
    case "ANECDOTE_LOADING_UNSET":
      return false;
    default: 
      return state;
  }
}

const notificationMessageReducer = (notificationMessage = initialState.notification_message,action) => {

  switch(action.type){
    case "NOTIFICATION_SHOW":
      return action.message;
    case "NOTIFICATION_HIDE":
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

const getPopulateAllAnecdotesAction = (anecdotesArr) => {
  return {
    type: "ANECDOTE_POPULATE_ALL",
    data: anecdotesArr
  }
}

const getAnecdoteLoadingSetAction = () => {
  return {
    type: "ANECDOTE_LOADING_SET"
  }
}

const getAnecdoteLoadingUnsetAction = () => {
  return {
    type: "ANECDOTE_LOADING_UNSET"
  }
}

const getNoticationShowAction = (text) => {
  return {
    type: "NOTIFICATION_SHOW",
    message: text
  }
}

const getNoticationHideAction = () => {
  return {
    type: "NOTIFICATION_HIDE"
  }
}

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  anecdotes_is_loading: anecdoteLoadingReducer,
  notification_message: notificationMessageReducer
  
})

export default reducer

export {
  anecdoteReducer,
  getUpvoteAction,
  getNewAnecdoteAction,
  getNoticationShowAction,
  getNoticationHideAction,
  getPopulateAllAnecdotesAction,
  getAnecdoteLoadingSetAction,
  getAnecdoteLoadingUnsetAction

}
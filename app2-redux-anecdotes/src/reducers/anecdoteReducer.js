import _ from "lodash";
import { combineReducers } from "redux";
import anecdotesService from "../services/anecdotes.js";




const initialState = {
  anecdotes: [],
  anecdotes_is_loading: false,
  notification_message: "",
  notification_id: ""
}

// let NOTIFICATION_TIMEOUT_ID = null;




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

const notificationIdReducer = (notificationId = initialState.notification_id,action) => {

  switch(action.type){
    case "NOTIFICATION_SETTIMEOUT":
      return action.timeoutId;
    case "NOTIFICATION_CLEARTIMEOUT":
      action.clearTimeout(notificationId);
      return ""; 
    default:
      return notificationId;
  }
}


//action creators

const getNotificationSetTimeoutAction = (timeoutId) => {
  return {
    type: "NOTIFICATION_SETTIMEOUT",
    timeoutId: timeoutId
  }
}

const getNotificationClearTimeoutAction = () => {
  return {
    type: "NOTIFICATION_CLEARTIMEOUT",
    clearTimeout: window.clearTimeout.bind(window)
  }
}


const getShowNotificationActionAsync = (text,timeoutValue=1000) => {
  return ((dispatch) => {
    // clearTimeout(NOTIFICATION_TIMEOUT_ID)
    dispatch(getNotificationClearTimeoutAction());
    dispatch(
      getNotificationSetTimeoutAction(
      setTimeout(() => {
        dispatch(getNoticationHideAction());
      },timeoutValue)
      )
      );
    dispatch(getNoticationShowAction(text));
    
  })
}


const getUpvoteAction = (id) => {
  return {
    type: "VOTE_UP",
    id: id
  }
}

const getUpvoteActionAsync = (data) => {
  return (async(dispatch) => {
    try{
      const upvoteResult = await anecdotesService.voteUp(data);
      dispatch(getUpvoteAction(upvoteResult.id));
      dispatch(getShowNotificationActionAsync(`Upvoted: ${upvoteResult.content}`,5000))
    }catch(e){
      console.error(`anecdoteReducer|ERROR`,e);
    }
  })
}

const getNewAnecdoteAdditionAction = (data) => {
  return {
    type: "ANECDOTE_NEW",
    data: data
  }
}

const getNewAnecdoteAdditionActionAsync = (anecdoteText) => {
  return (async(dispatch) => {
    try{
      const anecdoteCreationResult = await anecdotesService.create({
        content: anecdoteText
      })

      console.log(anecdoteCreationResult)

      dispatch(getNewAnecdoteAdditionAction(anecdoteCreationResult))
      dispatch(getShowNotificationActionAsync(`New anecdote: "${anecdoteText}"`,5000))

    }catch(e){
      console.error(`AnecdoteForm|ERROR`,e)
    }
  })
}

const getPopulateAllAnecdotesAction = (anecdotesArr) => {
  return {
    type: "ANECDOTE_POPULATE_ALL",
    data: anecdotesArr
  }
}

const getPopulateAllAnecdotesActionAsync = () => {
  return (async(dispatch) => {
    dispatch(getAnecdoteLoadingSetAction());
    try{
        const fetchedAnecdotes = await anecdotesService.getAll();
        dispatch(getPopulateAllAnecdotesAction(fetchedAnecdotes))
    }catch(e){
        dispatch(getPopulateAllAnecdotesAction([]))
    }
    dispatch(getAnecdoteLoadingUnsetAction());
  })
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
  return ((dispatch) => {
    dispatch({
    type: "NOTIFICATION_SHOW",
    message: text
  })
  })
}

const getNoticationHideAction = () => {
  return {
    type: "NOTIFICATION_HIDE"
  }
}

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  anecdotes_is_loading: anecdoteLoadingReducer,
  notification_message: notificationMessageReducer,
  notification_id: notificationIdReducer
  
})

export default reducer

export {
  anecdoteReducer,
  getUpvoteAction,
  getUpvoteActionAsync,
  getNewAnecdoteAdditionAction,
  getNoticationShowAction,
  getNoticationHideAction,
  getPopulateAllAnecdotesAction,
  getAnecdoteLoadingSetAction,
  getAnecdoteLoadingUnsetAction,
  getPopulateAllAnecdotesActionAsync,
  getNewAnecdoteAdditionActionAsync

}
import React from "react";
import {useDispatch} from "react-redux";
import {
  getNewAnecdoteAction,
  getNoticationShowAction,
  getNoticationHideAction,
} from "../reducers/anecdoteReducer.js";


//anecdote form component
const AnecdoteForm = ({formId}) => {

    const dispatch = useDispatch();

    if(!formId){
        formId="new-anecdote-form";
    }

    const showNewAnecdoteAsNotification = (anecdoteText) => {
      dispatch(getNoticationShowAction(anecdoteText))
      setTimeout(() => {
        dispatch(getNoticationHideAction(anecdoteText))
      },5000)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event);

        const anecdoteText = event.target["anecdote-text-input"].value;

        dispatch(getNewAnecdoteAction(anecdoteText))
        showNewAnecdoteAsNotification(anecdoteText)

    }

    return (<div>
    <h2>create new</h2>
      <form id={formId} onSubmit={handleSubmit}>
        <div><textarea form={formId} name="anecdote-text-input" /></div>
        <button type="submit">create</button>
      </form>
      </div>)
}


export default AnecdoteForm;
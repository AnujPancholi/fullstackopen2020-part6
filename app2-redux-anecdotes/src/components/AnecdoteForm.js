import React from "react";
import {useDispatch} from "react-redux";
import {getNewAnecdoteAction} from "../reducers/anecdoteReducer.js";



const AnecdoteForm = ({formId}) => {

    const dispatch = useDispatch();

    if(!formId){
        formId="new-anecdote-form";
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event);

        const anecdoteText = event.target["anecdote-text-input"].value;

        dispatch(getNewAnecdoteAction(anecdoteText))

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
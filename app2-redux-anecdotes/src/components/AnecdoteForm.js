import React from "react";
import {useDispatch} from "react-redux";
import {
  getNewAnecdoteAdditionActionAsync,
} from "../reducers/anecdoteReducer.js";



//anecdote form component
const AnecdoteForm = ({formId}) => {

    const dispatch = useDispatch();

    if(!formId){
        formId="new-anecdote-form";
    }

    

    const handleSubmit = (event) => {
        event.preventDefault();

        const anecdoteText = event.target["anecdote-text-input"].value;
        event.target["anecdote-text-input"].value="";
        // console.log(anecdoteText);

        dispatch(getNewAnecdoteAdditionActionAsync(anecdoteText))

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
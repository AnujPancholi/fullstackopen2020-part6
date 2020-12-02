import React from "react";
import {connect} from "react-redux";
import {
  getNewAnecdoteAdditionActionAsync,
} from "../reducers/anecdoteReducer.js";



//anecdote form component
const AnecdoteForm = ({formId,getNewAnecdoteAdditionActionAsync}) => {

    

    if(!formId){
        formId="new-anecdote-form";
    }

    

    const handleSubmit = (event) => {
        event.preventDefault();

        const anecdoteText = event.target["anecdote-text-input"].value;
        event.target["anecdote-text-input"].value="";
        // console.log(anecdoteText);

        getNewAnecdoteAdditionActionAsync(anecdoteText)

    }

    return (<div>
    <h2>create new</h2>
      <form id={formId} onSubmit={handleSubmit}>
        <div><textarea form={formId} name="anecdote-text-input" /></div>
        <button type="submit">create</button>
      </form>
      </div>)
}


const mapDispatchToProps = {
  getNewAnecdoteAdditionActionAsync
}


const ConnectedAnecdoteForm = connect(
  ((state) => ({})),
  mapDispatchToProps
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
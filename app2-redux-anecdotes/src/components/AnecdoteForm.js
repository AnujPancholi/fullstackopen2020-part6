import React from "react";
import {useDispatch} from "react-redux";
import {
  getNoticationShowAction,
  getNoticationHideAction,
  getNewAnecdoteAdditionAction,
} from "../reducers/anecdoteReducer.js";
import anecdotesService from "../services/anecdotes.js";


//anecdote form component
const AnecdoteForm = ({formId}) => {

    const dispatch = useDispatch();

    if(!formId){
        formId="new-anecdote-form";
    }

    const showTextNotification = (anecdoteText) => {
      dispatch(getNoticationShowAction(anecdoteText))
      setTimeout(() => {
        dispatch(getNoticationHideAction(anecdoteText))
      },5000)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        console.log(event);

        const anecdoteText = event.target["anecdote-text-input"].value;

        try{
          const anecdoteCreationResult = await anecdotesService.create({
            content: anecdoteText
          })

          dispatch(getNewAnecdoteAdditionAction(anecdoteCreationResult))
          showTextNotification(`New anecdote: "${anecdoteText}"`)

        }catch(e){

        }

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
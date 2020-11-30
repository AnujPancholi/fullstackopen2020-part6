import React,{ useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote'
import {
    getUpvoteAction,
    getNoticationShowAction,
    getNoticationHideAction,
    getPopulateAllAnecdotesActionAsync
} from "../reducers/anecdoteReducer.js"
import Notification from "./Notification.js"
import anecdotesService from "../services/anecdotes.js";
import _ from "lodash"


const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        const copiedState = _.map(state.anecdotes,(obj) => {
            return _.defaultsDeep({},obj);
        })
        copiedState.sort((a,b) => b.votes - a.votes);
        return copiedState;
    })

    const isLoading = useSelector(state => {
        return state.anecdotes_is_loading
    })

    const populateAnecdotes = () => {
        dispatch(getPopulateAllAnecdotesActionAsync())
    }

    useEffect(() => {
        populateAnecdotes()
    },[])

    const dispatch = useDispatch()

    const showTextNotification = (anecdoteText) => {
        dispatch(getNoticationShowAction(anecdoteText))
        setTimeout(() => {
          dispatch(getNoticationHideAction(anecdoteText))
        },5000)
      }

    const vote = (id,anecdoteText) => {
        console.log('vote', id)
        dispatch(getUpvoteAction(id))
        showTextNotification(`Upvoted: ${anecdoteText}`)
    }

    return (<>
        <h2>Anecdotes</h2>
            <Notification />
            {isLoading ? <div>Loading...</div> : anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} recordVote={vote} />
        )}
    </>)
}

export default AnecdoteList;
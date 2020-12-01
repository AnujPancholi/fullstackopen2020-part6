import React,{ useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote'
import {
    getUpvoteActionAsync,
    getPopulateAllAnecdotesActionAsync
} from "../reducers/anecdoteReducer.js"
import Notification from "./Notification.js"
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

    const vote = (data,anecdoteText) => {
        console.log('vote', data.id)

        dispatch(getUpvoteActionAsync(data))
        
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
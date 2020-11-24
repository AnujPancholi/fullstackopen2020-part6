import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote'
import {getUpvoteAction} from "../reducers/anecdoteReducer.js"
import _ from "lodash"


const AnecdoteContainer = () => {

    const anecdotes = useSelector(state => {
        const copiedState = _.map(state,(obj) => {
            return _.defaultsDeep({},obj);
        })
        copiedState.sort((a,b) => b.votes - a.votes);
        return copiedState;
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(getUpvoteAction(id))
    }

    return (<>
        <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} recordVote={vote} />
        )}
    </>)
}

export default AnecdoteContainer;
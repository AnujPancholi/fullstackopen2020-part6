import React,{ useEffect } from "react";
import { connect } from 'react-redux';
import Anecdote from './Anecdote'
import {
    getUpvoteActionAsync,
    getPopulateAllAnecdotesActionAsync
} from "../reducers/anecdoteReducer.js"
import Notification from "./Notification.js"
import _ from "lodash"


const AnecdoteList = (props) => {

    const getSortedCopy = (inputList) => {
        const copiedState = _.map(inputList,(obj) => {
            return _.defaultsDeep({},obj);
        })
        copiedState.sort((a,b) => b.votes - a.votes);
        return copiedState;
    }

    const anecdotes = getSortedCopy(props.state_anecdotes)

    const isLoading = props.state_anecdotes_is_loading

    const populateAnecdotes = () => {
        
        props.getPopulateAllAnecdotesActionAsync();
    }

    useEffect(() => {
        populateAnecdotes()
    },[])

    const vote = (data) => {
        console.log('vote', data.id)

        props.getUpvoteActionAsync(data)
        
    }

    return (<>
        <h2>Anecdotes</h2>
            <Notification />
            {isLoading ? <div>Loading...</div> : anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} recordVote={vote} />
        )}
    </>)
}

const mapStateToProps = (state) => {
    return {
        state_anecdotes: state.anecdotes,
        state_anecdotes_is_loading: state.anecdotes_is_loading,
    }
}

const mapDispatchToProps = {
    getPopulateAllAnecdotesActionAsync,
    getUpvoteActionAsync
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList;
import React from "react";


const Anecdote = ({anecdote, recordVote}) => {

    const performUpvote = () => {
        recordVote(anecdote.id);
    }

    return (<div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={performUpvote}>vote</button>
          </div>
        </div>)
}


export default Anecdote;
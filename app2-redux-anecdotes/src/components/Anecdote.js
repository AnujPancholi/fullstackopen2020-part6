import React from "react";


const Anecdote = ({anecdote, recordVote}) => {

    return (<div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => recordVote(anecdote.id)}>vote</button>
          </div>
        </div>)
}


export default Anecdote;
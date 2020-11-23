import React,{useState} from "react";


const Anecdote = ({anecdote, recordVote}) => {

    const [voteCount,setVoteCount] = useState(anecdote.votes);

    const performUpvote = () => {
        recordVote(anecdote.id);
        setVoteCount(voteCount+1);
    }

    return (<div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {voteCount}
            <button onClick={performUpvote}>vote</button>
          </div>
        </div>)
}


export default Anecdote;
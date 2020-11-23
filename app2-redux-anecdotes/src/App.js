import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './components/Anecdote'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)

    dispatch({
      type: "VOTE_UP",
      id: id
    })

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote anecdote={anecdote} recordVote={vote} />
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
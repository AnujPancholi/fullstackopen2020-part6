import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './components/Anecdote'
import {getUpvoteAction} from "./reducers/anecdoteReducer.js"

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)

    dispatch(getUpvoteAction(id))

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} recordVote={vote} />
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
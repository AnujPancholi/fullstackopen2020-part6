import React from 'react'
import AnecdoteContainer from './components/AnecdoteContainer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  

  return (
    <div>
      <AnecdoteContainer />
      <AnecdoteForm formId="anecdote-form" />
    </div>
  )
}

export default App
import React from 'react'
import AnecdoteList from './components/AnecdoteList.js'
import AnecdoteForm from './components/AnecdoteForm.js'

const App = () => {
  

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm formId="anecdote-form" />
    </div>
  )
}

export default App
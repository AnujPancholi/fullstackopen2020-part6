import React from 'react'
import AnecdoteContainer from './components/AnecdoteContainer'

const App = () => {
  

  return (
    <div>
      <AnecdoteContainer />
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
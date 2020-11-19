import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const addReview = (reviewType = "NONE") => {
    return function(){
      store.dispatch({
        type: reviewType
      })
    }
    
  }

  return (
    <div>
      <button onClick={addReview("GOOD")}>good</button> 
      <button onClick={addReview("OK")}>neutral</button> 
      <button onClick={addReview("BAD")}>bad</button>
      <button onClick={addReview("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

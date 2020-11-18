import _ from "lodash"

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}




const counterReducer = (state = initialState, action) => {
  // console.log(action)
  
  switch (action.type) {
    case 'GOOD':
      return _.defaultsDeep({
        "good": state.good+1
      }, state)
    case 'OK':
      return _.defaultsDeep({
        "ok": state.ok+1
      }, state)
    case 'BAD':
      return _.defaultsDeep({
        "bad": state.bad+1
      }, state)
    case 'ZERO':
      return state
    default: return state
  }
  
}

export default counterReducer
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/anecdoteReducer';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension"

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(reduxThunk)
    )
);

export default store;
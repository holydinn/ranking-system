import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import UserStore from "./store/UseerStore.js";
import EventStore from "./store/EventStore.js";

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    user:new UserStore(),
    event:new EventStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
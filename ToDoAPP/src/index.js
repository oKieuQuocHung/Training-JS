import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

{
  todos: [{
    id: 1,
    text: 'String'
  }]
}

{ type: 'ADD_TODO', text: 'Go to company' }
{ type: 'REMOVE_TODO', id: 1 }

functions todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, id: state.length + 1 }]);
    case 'REMOVE_TODO':
      let index = state.findIndex((ele) => ele.id == action.id);
      state.splice(index, 1);
      return state;
    default:
      return state;
  }
}

function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action)
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));

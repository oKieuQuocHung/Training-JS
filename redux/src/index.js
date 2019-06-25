import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

function todos(state = [], action) {
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

const todoStore = createStore(todoApp);

const TodoForm = ({addTodo}) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        addTodo(input.value);
        input.value = '';
      }}>
        +
      </button>
    </div>
  );
};

const Todo = ({ todo, remove }) => {
  return (<li>
    {todo.text}
    <a href="javascript:" onClick={() => remove(todo.id) }>
      _Delete
    </a>
  </li >);
};

const TodoList = ({ todos, remove }) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} />)
  });
  return (<ul>{todoNode}</ul>);
};

const Title = () => {
  return (
    <div>
      <div>
        <h1>to-do</h1>
      </div>
    </div>
  );
};

class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  addTodo = (text) => {
    todoStore.dispatch({ type: "ADD_TODO", text });
    this.setState({ data: todoStore.getState().todos });
  }

  handleRemove = (id) => {
    todoStore.dispatch({
      type: "REMOVE_TODO",
      id
    })
    this.setState({
      data: todoStore.getState().todos
    });
  }

  render(){
    return (
      <div>
        <Title />
        <TodoForm addTodo={ this.addTodo } />
        <TodoList
          todos = {
            this.state.data
          }
          remove={this.handleRemove}
        />
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));

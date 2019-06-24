import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

window.id = 1;

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

  addTodo = (val) => {
    const todo = {text: val, id: window.id++}
    let data = this.state.data;
    data.push(todo);
    this.setState({ data });
  }

  handleRemove = (id) => {
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    this.setState({ data: remainder });
  }

  render(){
    return (
      <div>
        <Title />
        <TodoForm addTodo={ this.addTodo } />
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove}
        />
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));

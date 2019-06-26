import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const todoReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      let todo = { text: action.text, id: state.length + 1 }
      return state.concat(todo);
    default:
      return state;
  }
}

const store = createStore(todoReducer, []);

const NavBar = () => {
  return(
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" >
            To Do App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const ToDo = ({ todo }) => {
  return <Card>
    <CardContent>
      <Typography variant="body2" component="p" >
        { todo.text }
      </Typography>
    </CardContent>
  </Card>
}

const stateToDoList = (state, ownProps) => {
  return {
    todoList: state
  }
}

const ToDoList = connect(stateToDoList, null)(({ todoList }) => {
  return todoList.map((todo) => {
    return <ToDo key={todo.id} todo={todo}></ToDo>
  });
})

const dispathAddToDo = dispatch => {
  return {
    addTodo: (text) => dispatch({type: 'ADD_TODO', text })
  }
}

const AddToDo = connect(null, dispathAddToDo)(({ addTodo }) => {
  let input;
  return (
    <Grid container>
      <Grid item md={9} xs={12}>
        <TextField
          label="To Do ..."
          margin="normal"
          fullWidth={true}
          inputRef={node => input = node}
        />
      </Grid>
      <Grid container item md={3} alignItems="center" justify="center">
        <Button variant="contained" color="primary" size="large" onClick={() => {
          addTodo(input.value)
        }
        }>
          ADD
        </Button>
      </Grid>
    </Grid>
  )
});

const LIST = [
  {id:1, text: "test"}
]

const App = () => {
  return <Provider store={store}>
    <Container maxWidth="md">
      <NavBar></NavBar>
      <AddToDo></AddToDo>
      <div>
        <ToDoList></ToDoList>
      </div>
    </Container>
  </Provider>
}


ReactDOM.render(<App />, document.getElementById('root'));

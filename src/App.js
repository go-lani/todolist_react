import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: 1, content: 'HTML', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 3, content: 'Javascript', completed: false },
      ],
    };
  }

  createId = () => {
    return Math.max(0, ...this.state.todos.map(todo => todo.id)) + 1;
  };

  addTodo = ({ key, target, target: { value } }) => {
    if (key !== 'Enter' || value.trim() === '') return;

    this.setState({
      todos: [...this.state.todos, { id: this.createId(), content: value, completed: false }],
    });

    target.value = '';
  };

  removeTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)],
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className="title">Todos</h1>
          <div className="ver">2.0</div>

          <input
            className="input-todo"
            placeholder="What needs to be done?"
            onKeyPress={this.addTodo}
            autoFocus
          />
          <ul className="nav">
            <li id="all" className="active">
              All
            </li>
            <li id="active">Active</li>
            <li id="completed">Completed</li>
          </ul>
          <ul className="todos">
            {this.state.todos &&
              this.state.todos.map(todo => (
                <li key={todo.id} id={todo.id} className="todo-item">
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id={'ck-myId' + todo.id}
                    defaultChecked={todo.completed ? true : false}
                  />
                  <label htmlFor={'ck-myId' + todo.id}>{todo.content}</label>
                  <i
                    className="remove-todo far fa-times-circle"
                    onClick={() => this.removeTodo(todo.id)}
                  ></i>
                </li>
              ))}
          </ul>
          <div className="footer">
            <div className="complete-all">
              <input className="custom-checkbox" type="checkbox" id="ck-complete-all" />
              <label htmlFor="ck-complete-all">Mark all as complete</label>
            </div>
            <div className="clear-completed">
              <button className="btn">
                Clear completed (<span className="completed-todos">0</span>)
              </button>
              <strong className="active-todos">0</strong> items left
            </div>
          </div>
        </div>
      </>
    );
  }
}

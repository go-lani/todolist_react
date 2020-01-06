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

  render() {
    return (
      <>
        <div class="container">
          <h1 class="title">Todos</h1>
          <div class="ver">2.0</div>

          <input class="input-todo" placeholder="What needs to be done?" autofocus />
          <ul class="nav">
            <li id="all" class="active">
              All
            </li>
            <li id="active">Active</li>
            <li id="completed">Completed</li>
          </ul>

          <ul class="todos">
            {/* <li id="myId" class="todo-item">
            <input class="custom-checkbox" type="checkbox" id="ck-myId">
            <label for="ck-myId">HTML</label>
            <i class="remove-todo far fa-times-circle"></i>
            </li> */}
          </ul>
          <div class="footer">
            <div class="complete-all">
              <input class="custom-checkbox" type="checkbox" id="ck-complete-all" />
              <label for="ck-complete-all">Mark all as complete</label>
            </div>
            <div class="clear-completed">
              <button class="btn">
                Clear completed (<span class="completed-todos">0</span>)
              </button>
              <strong class="active-todos">0</strong> items left
            </div>
          </div>
        </div>
      </>
    );
  }
}

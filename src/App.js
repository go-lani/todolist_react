import React, { Component } from 'react';
import { CreateTodo } from './components/Todolist';
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
      category: 'all',
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

  toggleCompleted = id => {
    this.setState({
      todos: [
        ...this.state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      ],
    });
  };

  allComplete = e => {
    this.setState({
      todos: [
        ...this.state.todos.map(todo => ({
          ...todo,
          completed: e.target.checked,
        })),
      ],
    });
  };

  clearComplete = () => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.completed !== true)],
    });
  };

  changeCategory = e => {
    const Lis = e.target.parentNode.children;
    const thisLi = e.target;

    this.setState({
      category: thisLi.id,
    });

    [...Lis].forEach(li => {
      li.classList.remove('active');
    });

    thisLi.classList.add('active');
  };

  renderCategory = (todos, category) => {
    const _todos = todos;
    switch (category) {
      case 'all':
        return _todos.map(todo => (
          <CreateTodo
            key={todo.id}
            todo={todo}
            removeTodo={this.removeTodo}
            toggleCompleted={this.toggleCompleted}
          />
        ));
      case 'active':
        return _todos
          .filter(todo => todo.completed === false)
          .map(todo => (
            <CreateTodo
              key={todo.id}
              todo={todo}
              removeTodo={this.removeTodo}
              toggleCompleted={this.toggleCompleted}
            />
          ));
      case 'completed':
        return _todos
          .filter(todo => todo.completed === true)
          .map(todo => (
            <CreateTodo
              key={todo.id}
              todo={todo}
              removeTodo={this.removeTodo}
              toggleCompleted={this.toggleCompleted}
            />
          ));
      default:
        return _todos.map(todo => (
          <CreateTodo
            key={todo.id}
            todo={todo}
            removeTodo={this.removeTodo}
            toggleCompleted={this.toggleCompleted}
          />
        ));
    }
  };

  render() {
    const { todos, category } = this.state;
    return (
      <>
        <div className="container">
          <h1 className="title">Todos</h1>
          <div className="ver">2.0</div>

          {/* 할일 추가 영역 */}
          <input
            className="input-todo"
            placeholder="What needs to be done?"
            onKeyPress={this.addTodo}
            autoFocus
          />

          {/* 할일 카테고리 탭 영역 */}
          <ul className="nav" onClick={this.changeCategory}>
            <li id="all" className="active">
              All
            </li>
            <li id="active">Active</li>
            <li id="completed">Completed</li>
          </ul>

          {/* 할일 리스트 영역 */}
          <ul className="todos">{this.renderCategory(todos, category)}</ul>

          {/* 할일 푸터 영역 */}
          <div className="footer">
            <div className="complete-all">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="ck-complete-all"
                onChange={this.allComplete}
              />
              <label htmlFor="ck-complete-all">Mark all as complete</label>
            </div>
            <div className="clear-completed">
              <button className="btn" onClick={this.clearComplete}>
                Clear Completed (
                <span className="completed-todos">
                  {todos.filter(todo => todo.completed === true).length}
                </span>
                )
              </button>
              <strong className="active-todos">
                {todos.filter(todo => todo.completed === true).length}
                items left
              </strong>
            </div>
          </div>
        </div>
      </>
    );
  }
}

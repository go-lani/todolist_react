import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TodosWrapper from './components/Todolist';
import Todo from './components/Todolist/Todo';
import Tab from './components/Tab';
import Tablist from './components/Tab/TabList';
import CreateInput from './components/Inputs/CreateInput';
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
      categorys: [
        { id: 'all', open: true },
        { id: 'active', open: false },
        { id: 'completed', open: false },
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
    if (e.target.classList.contains('nav')) return;

    const Lis = e.target.parentNode.children;
    const thisLi = e.target;

    this.setState({
      categorys: [
        ...this.state.categorys.map(category =>
          category.id === thisLi.id ? { ...category, open: true } : { ...category, open: false },
        ),
      ],
    });

    [...Lis].forEach(li => {
      li.classList.remove('active');
    });

    thisLi.classList.add('active');
  };

  renderCategory = (todos, categorys) => {
    const [{ id: currentCategory }] = categorys.filter(category => category.open === true);
    const _todos = todos;
    switch (currentCategory) {
      case 'all':
        return _todos.map(todo => (
          <Todo
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
            <Todo
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
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={this.removeTodo}
              toggleCompleted={this.toggleCompleted}
            />
          ));
      default:
        return _todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            removeTodo={this.removeTodo}
            toggleCompleted={this.toggleCompleted}
          />
        ));
    }
  };

  render() {
    const { todos, categorys } = this.state;
    return (
      <>
        <div className="container">
          <Header>
            <CreateInput onAddTodo={this.addTodo} />
          </Header>

          {/* 할일 카테고리 탭 영역 */}
          <Tab onChangeTab={this.changeCategory}>
            {this.state.categorys.map(category => (
              <Tablist key={category.id} categoryInfo={category} />
            ))}
          </Tab>

          {/* 할일 리스트 영역 */}
          <TodosWrapper>{this.renderCategory(todos, categorys)}</TodosWrapper>

          {/* 할일 푸터 영역 */}
          <Footer todos={todos} allComplete={this.allComplete} clearComplete={this.clearComplete} />
        </div>
      </>
    );
  }
}

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
      todos: [],
      categories: [
        { id: 'all', open: true },
        { id: 'active', open: false },
        { id: 'done', open: false },
      ],
    };
  }

  componentDidMount() {
    this.setState({
      todos: [
        { id: 1, content: 'HTML', done: false },
        { id: 2, content: 'CSS', done: true },
        { id: 3, content: 'Javascript', done: false },
      ],
    });
  }

  // Todo 렌더링 함수
  renderTodo = (todos, categories) => {
    const [{ id: currentCategory }] = categories.filter(category => category.open === true);

    let _todos = todos;

    if (currentCategory === 'active') _todos = todos.filter(todo => todo.done === false);
    if (currentCategory === 'done') _todos = todos.filter(todo => todo.done === true);

    return _todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onRemoveTodo={this.removeTodo}
        onToggleDone={this.toggleDone}
      />
    ));
  };

  // Todo 생성시 ID 생성기능
  createId = () => {
    return Math.max(0, ...this.state.todos.map(todo => todo.id)) + 1;
  };

  // Todo 생성기능
  addTodo = ({ key, target, target: { value } }) => {
    if (key !== 'Enter' || value.trim() === '') return;

    this.setState({
      todos: [...this.state.todos, { id: this.createId(), content: value, done: false }],
    });

    target.value = '';
  };

  // Todo 삭제기능
  removeTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)],
    });
  };

  // Todo 완료/미완료 체크 기능
  toggleDone = id => {
    this.setState({
      todos: [
        ...this.state.todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
      ],
    });
  };

  // 전체 완료 기능
  allDone = e => {
    this.setState({
      todos: [
        ...this.state.todos.map(todo => ({
          ...todo,
          done: e.target.checked,
        })),
      ],
    });
  };

  // 완료한 Todo 삭제기능
  clearDone = () => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.done !== true)],
    });
  };

  // 카테고리 탭 기능
  changeCategory = id => {
    this.setState({
      categories: [
        ...this.state.categories.map(category =>
          category.id === id ? { ...category, open: true } : { ...category, open: false },
        ),
      ],
    });
  };

  render() {
    const { todos, categories } = this.state;
    return (
      <>
        <div className="container">
          {/* Header와 할일 추가 Input 영역 */}
          <Header>
            <CreateInput onAddTodo={this.addTodo} />
          </Header>

          {/* 할일 카테고리 탭 영역 */}
          <Tab>
            {this.state.categories.map(category => (
              <Tablist
                key={category.id}
                categoryInfo={category}
                onChangeCategory={this.changeCategory}
              />
            ))}
          </Tab>

          {/* 할일 리스트 영역 */}
          <TodosWrapper>{this.renderTodo(todos, categories)}</TodosWrapper>

          {/* 할일 푸터 영역 */}
          <Footer todos={todos} onAllDone={this.allDone} onClearDone={this.clearDone} />
        </div>
      </>
    );
  }
}

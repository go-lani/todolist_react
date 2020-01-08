import React from 'react'

export default function Todo({ todo: { id, content, done }, removeTodo, toggleDone }) {
  return (
    <li id={id} className="todo-item">
      <input
        className="custom-checkbox"
        type="checkbox"
        id={'ck-myId' + id}
        checked={done ? true : false}
        onChange={() => toggleDone(id)}
      />
      <label htmlFor={'ck-myId' + id}>{content}</label>
      <i className="remove-todo far fa-times-circle" onClick={() => removeTodo(id)}></i>
    </li>
  );
};
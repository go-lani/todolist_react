import React from 'react'

export default function Todo({ todo: { id, content, completed }, removeTodo, toggleCompleted }) {
  return (
    <li id={id} className="todo-item">
      <input
        className="custom-checkbox"
        type="checkbox"
        id={'ck-myId' + id}
        checked={completed ? true : false}
        onChange={() => toggleCompleted(id)}
      />
      <label htmlFor={'ck-myId' + id}>{content}</label>
      <i className="remove-todo far fa-times-circle" onClick={() => removeTodo(id)}></i>
    </li>
  );
};
import React from 'react';

export default function CreateInput({ onAddTodo }) {
  return (
    <input
      className="input-todo"
      placeholder="What needs to be done?"
      onKeyPress={onAddTodo}
      autoFocus
    />
  );
}

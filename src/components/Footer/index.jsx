import React from 'react'

export default function Footer({todos, onClearDone, onAllDone }) {
  return (
    <footer className="footer">
      <div className="complete-all">
        <input
          className="custom-checkbox"
          type="checkbox"
          id="ck-complete-all"
          onChange={onAllDone}
        />
        <label htmlFor="ck-complete-all">Mark all as done</label>
      </div>
      <div className="clear-completed">
        <button className="btn" onClick={onClearDone}>
          Clear Done
          (<span className="completed-todos">
            {todos.filter(todo => todo.done === true).length}
          </span>)
        </button>
        <strong className="active-todos">
          {todos.filter(todo => todo.done === false).length} items left
        </strong>
      </div>
    </footer>
  )
}
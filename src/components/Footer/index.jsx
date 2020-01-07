import React from 'react'

export default function Footer({todos, allComplete, clearComplete }) {
  return (
    <footer className="footer">
      <div className="complete-all">
        <input
          className="custom-checkbox"
          type="checkbox"
          id="ck-complete-all"
          onChange={allComplete}
        />
        <label htmlFor="ck-complete-all">Mark all as complete</label>
      </div>
      <div className="clear-completed">
        <button className="btn" onClick={clearComplete}>
          Clear Completed
          (<span className="completed-todos">
            {todos.filter(todo => todo.completed === true).length}
          </span>)
        </button>
        <strong className="active-todos">
          {todos.filter(todo => todo.completed === false).length} items left
        </strong>
      </div>
    </footer>
  )
}
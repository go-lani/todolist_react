import React from 'react'

export default function TodosWrapper(props) {
  return (
    <ul className="todos">
      {props.children}
    </ul>
  )
}

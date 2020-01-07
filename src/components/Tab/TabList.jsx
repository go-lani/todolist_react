import React from 'react'

export default function TabList({ categoryInfo }) {
  const { id, open } = categoryInfo;
  return (
    <li id={id} className={open ? 'active' : ''}>
      {id.charAt(0).toUpperCase() + id.slice(1)}
    </li>
  )
}

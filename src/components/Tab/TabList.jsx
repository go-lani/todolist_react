import React from 'react'

export default function TabList({ categoryInfo, onChangeCategory }) {
  const { id, open } = categoryInfo;
  return (
    <li id={id} className={open ? 'active' : ''} onClick={() => onChangeCategory(id)}>
      {id.charAt(0).toUpperCase() + id.slice(1)}
    </li>
  )
}

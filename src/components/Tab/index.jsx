import React from 'react';

export default function Tab({ onChangeTab, children }) {
  return (
    <ul className="nav" onClick={onChangeTab}>
      {children}
    </ul>
  );
}

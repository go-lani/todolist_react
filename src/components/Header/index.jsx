import React from 'react';

export default function Header(props) {
  return (
    <header>
      <h1 className="title">Todos</h1>
      <div className="ver">1.0</div>
      {props.children}
    </header>
  );
}

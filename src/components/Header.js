import React from 'react';

const Header = (props) => {
  return (
    <header className="Header__Component">
      <h1>{props.title}</h1>
      <h2>{props.message}</h2>
    </header>
  );
}

export default Header;

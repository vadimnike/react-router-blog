import React from 'react';
import {Link} from 'react-router-dom';

export const Navbar = ()=>{
  return (
    <ul>
      <li>
        <Link to="/">Root</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
      </li>
    </ul>
  )
}
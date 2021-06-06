import React from 'react';
import {
  NavLink, withRouter,
} from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <NavLink id="home" exact to="/">View All Posts</NavLink>
        <NavLink to="/posts/new">New Post</NavLink>
      </ul>
    </nav>
  );
};

export default withRouter(Nav);

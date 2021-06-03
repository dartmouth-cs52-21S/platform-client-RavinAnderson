import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import React from 'react';
import Posts from './posts';
import NewPost from './newpost';
import Post from './post';
import Nav from './navbar';

const App = (props) => {
  return (
    <Router>
      <Nav />
      <div id="post-block">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          {/* <Route render={() => (<div>post not found </div>)} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { fetchPosts } from '../actions/index';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      this.props.posts.map((post) => {
        return (
          <div className="post-section" key={post.id}>
            <NavLink to={`/posts/${post.id}`}>
              <img src={post.coverUrl} alt="Post Url" />
              <h1 className="posts-title">{post.title}</h1>
              <p className="posts-tags">Tags: {post.tags}</p>
            </NavLink>
          </div>
        );
      })
    );
  }
}

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));

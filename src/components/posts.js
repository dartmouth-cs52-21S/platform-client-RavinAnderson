import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import SearchBar from './searchBar';
import { fetchPosts } from '../actions/index';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searching: false, searchterm: '' };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderSearchBar = (event) => {
    return <SearchBar update={this.updateSearchBar} />;
  }

  updateSearchBar = (newsearchterm) => {
    if (newsearchterm !== '') {
      this.setState({ searching: true });
    } else {
      this.setState({ searching: false });
    }
    this.setState({ searchterm: newsearchterm });
  }

  findPosts = (searchterm) => {
    return (
      this.props.posts.map((post) => {
        if (post.tags.includes(searchterm)) {
          return (
            <div className="post-section" key={post.id}>
              <NavLink to={`/posts/${post.id}`}>
                <img src={post.coverUrl} alt="Post Url" />
                <h1 className="posts-title">{post.title}</h1>
                <p className="posts-tags">Tags: {post.tags}</p>
              </NavLink>
            </div>
          );
        }
        return <p />;
      })
    );
  }

  normalRender() {
    if (this.state.searching) {
      return this.findPosts(this.state.searchterm);
    } else {
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

  render() {
    return (
      <div id="main-area">
        {this.renderSearchBar()}
        <div id="post-area">
          {this.normalRender()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));

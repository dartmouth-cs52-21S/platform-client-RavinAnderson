/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/prefer-stateless-function */
// some imports
import { connect } from 'react-redux';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import {
  fetchPost, deletePost, updatePost,
} from '../actions/index';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      postInfo: {
        title: '',
        tags: '',
        content: '',
        coverUrl: '',
      },
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  onEdit = (event) => {
    if (this.state.isEditing) {
      this.props.updatePost(this.props.currentPost._id, this.state.postInfo);
      this.setState((prevState) => ({
        isEditing: !prevState.isEditing,
      }));
    } else {
      this.setState({
        postInfo: {
          title: this.props.currentPost.title,
          tags: this.props.currentPost.tags,
          content: this.props.currentPost.content,
          coverUrl: this.props.currentPost.coverUrl,
        },
      });
      this.setState((prevState) => ({
        isEditing: !prevState.isEditing,
      }));
    }
  }

  onDelete = (event) => {
    this.props.deletePost(this.props.currentPost._id, this.props.history);
  }

  onTitleChange = (event) => {
    this.setState({
      postInfo: {
        title: event.target.value,
      },
    });
    this.props.updatePost(this.props.currentPost._id, this.state.postInfo);
  }

  onTagsChange = (event) => {
    this.setState({
      postInfo: {
        tags: event.target.value,
      },
    });
    this.props.updatePost(this.props.currentPost._id, this.state.postInfo);
  }

  onContentChange = (event) => {
    this.setState({
      postInfo: {
        content: event.target.value,
      },
    });
    this.props.updatePost(this.props.currentPost._id, this.state.postInfo);
  }

  onUrlChange = (event) => {
    this.setState({
      postInfo: {
        coverUrl: event.target.value,
      },
    });
    this.props.updatePost(this.props.currentPost._id, this.state.postInfo);
  }

  renderTitle = () => {
    if (this.state.isEditing) {
      return <input id="change-title" type="text" onChange={this.onTitleChange} placeholder="title..." value={this.state.postInfo.title} />;
    } else {
      return <div><h1 className="post-title">{this.props.currentPost.title}</h1></div>;
    }
  }

  renderTags = () => {
    if (this.state.isEditing) {
      return <input id="change-tags" type="text" onChange={this.onTagsChange} placeholder="tags..." value={this.state.postInfo.tags} />;
    } else {
      return <p className="post-tags">{this.props.currentPost.tags}</p>;
    }
  }

  renderContent = () => {
    if (this.state.isEditing) {
      return <textarea id="change-content" type="text" onChange={this.onContentChange} placeholder="content..." value={this.state.postInfo.content} rows="10" cols="100" />;
    } else {
      return (
        <p className="post-content">
          <ReactMarkdown>{this.props.currentPost.content || ''}</ReactMarkdown>
        </p>
      );
    }
  }

  renderUrl = () => {
    if (this.state.isEditing) {
      return <input id="change-url" type="text" onChange={this.onUrlChange} placeholder="cover url..." value={this.state.postInfo.coverUrl} />;
    } else {
      return <div id="image"><img className="post-url" src={this.props.currentPost.coverUrl} alt="Post Url" /></div>;
    }
  }

  renderEdit = () => {
    return <FontAwesomeIcon className="post-edit_button" icon={faEdit} role="edit" tabIndex={0} onClick={this.onEdit} size="2x" />;
  }

  renderDelete = () => {
    return <FontAwesomeIcon className="post-delete" icon={faTrashAlt} role="delete" tabIndex={0} onClick={this.onDelete} size="2x" />;
  }

  render() {
    return (
      <div className="post">
        <div className="buttons">
          {this.renderEdit()}
          {this.renderDelete()}
        </div>
        <div className="body">
          {this.renderUrl()}
          {this.renderTitle()}
          {this.renderContent()}
          {this.renderTags()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);

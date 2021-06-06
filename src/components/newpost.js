/* eslint-disable no-alert */
/* eslint-disable react/prefer-stateless-function */
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
    };
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  onContentChange = (event) => {
    this.setState({ content: event.target.value });
  }

  onTagsChange = (event) => {
    this.setState({ tags: event.target.value });
  }

  onUrlChange = (event) => {
    console.log('changing');
    console.log(event.target.value);
    this.setState({ coverUrl: event.target.value });
  }

  onNewPost = (event) => {
    if (this.state.title === '' || this.state.tags === '' || this.state.content === '' || this.state.coverUrl === '') {
      console.log('stop the shit');
      return alert('Please check fields to make sure you entered them correctly.');
    } else {
      console.log('how');
      return this.props.createPost(this.state, this.props.history);
    }
  }

  render() {
    return (
      <div className="new-post">
        <h2>Create A New Post </h2>
        <TextField
          id="outlined-basic"
          label="Title"
          onChange={this.onTitleChange}
          value={this.state.title}
        />
        <TextField
          id="outlined-basic"
          label="Content"
          onChange={this.onContentChange}
          value={this.state.content}
        />
        <TextField
          id="outlined-basic"
          label="Tags"
          onChange={this.onTagsChange}
          value={this.state.tags}
        />
        <TextField
          id="outlined-basic"
          label="URL"
          onChange={this.onUrlChange}
          value={this.state.coverUrl}
        />
        <div className="new-post-buttons">
          <Button variant="contained" onClick={() => this.props.history.push('/')}>
            Cancel
          </Button>
          <Button variant="contained" onClick={this.onNewPost}>
            Create
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.posts.errorMessage,
  };
};

export default withRouter(connect(mapStateToProps, { createPost })(NewPost));

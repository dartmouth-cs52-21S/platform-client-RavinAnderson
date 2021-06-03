import React from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchterm: '' };
  }

  onInputChange = (event) => {
    this.props.update(event.target.value);
    this.setState({ searchterm: event.target.value });
  }

  render() {
    return (
      <div id="search-bar">
        <TextField onChange={this.onInputChange} value={this.state.searchterm} variant="filled" placeholder="search by tag..." />
      </div>
    );
  }
}

export default SearchBar;

import { Component } from 'react';
import './searchbar.css';
import propTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ query: value.toLowerCase().trim() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query === '') {
      alert('Enter image title');
      return;
    }
    onSubmit(query);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="searchForm-button"></button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            // autoFocus
            placeholder="Search images"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

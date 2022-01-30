import { useState} from 'react';
import './searchbar.css';
import propTypes from 'prop-types';


function SearchBar({onSubmit}){
  const [query, setQuery] = useState("");

  const handleChange = ({ target: { value } }) => {
    setQuery(value.toLowerCase().trim());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (query === "") {
      alert("Enter image title");
      return;
    }

    onSubmit(query);

    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={handleSubmit}>
          <button type="submit" className="searchForm-button"></button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            // autoFocus
            placeholder="Search images"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  };
}

    

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

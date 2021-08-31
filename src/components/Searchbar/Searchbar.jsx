import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    image: '',
  };
  handleInputChange = e => {
    this.setState({ image: e.currentTarget.value.toLowerCase() });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    if (this.state.image.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.image);
    this.setState({ image: '' });
    this.props.toast();
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={this.state.image}
            onChange={this.handleInputChange}
            placeholder="Search images and photos"
          />
        </form>
        {this.state.image === '' && (
          <p className="text"> Please, enter something in the search bar</p>
        )}
      </header>
    );
  }
}

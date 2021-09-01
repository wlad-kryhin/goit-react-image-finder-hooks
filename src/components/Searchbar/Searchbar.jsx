import { useState } from "react";

export default function Searchbar({ onSubmit, toast }) {
  const [image, setImage] = useState("");

  const handleInputChange = (e) => {
    setImage(e.currentTarget.value.toLowerCase());
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (image.trim() === "") {
      return;
    }
    onSubmit(image);
    setImage("");
    toast();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={image}
          onChange={handleInputChange}
          placeholder="Search images and photos"
        />
      </form>
      {image === "" && (
        <p className="text"> Please, enter something in the search bar</p>
      )}
    </header>
  );
}

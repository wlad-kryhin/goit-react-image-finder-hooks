import PropTypes from 'prop-types';
export default function Button({ onClick }) {
  return (
    <button type="button" className="Button" onClick={onClick}>
      Load more
    </button>
  );
}
Button.propTypes = {
  onclick: PropTypes.func,
};

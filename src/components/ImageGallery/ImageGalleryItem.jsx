import PropTypes from 'prop-types';
export default function ImageGalleryItem({ images, onClick }) {
  return images.map(({ id, webformatURL, tags }) => {
    return (
      <li className="ImageGalleryItem" onClick={() => onClick(id)} key={id}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
      </li>
    );
  });
}
ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func,
};

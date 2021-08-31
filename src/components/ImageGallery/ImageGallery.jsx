import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, find }) {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} onClick={find} />
    </ul>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.array,
  find: PropTypes.func,
};

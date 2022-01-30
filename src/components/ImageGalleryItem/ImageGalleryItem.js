import './imageGalleryItem.css';
import propTypes from 'prop-types';

const ImageGalleryItem = ({ largeImage, tags, preview, modalOpen }) => {
  return (
    <li onClick={event => modalOpen(largeImage, tags, event)}>
      <a className="imageGalleryItem-link" href={largeImage}>
        <img className="imageGalleryItem-image" src={preview} alt={tags} />
      </a>
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImage: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  preview: propTypes.string.isRequired,
  modalOpen: propTypes.func.isRequired,
};

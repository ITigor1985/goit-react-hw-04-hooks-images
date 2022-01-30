import ImageGalleryItem from 'components/ImageGalleryItem';
import propTypes from 'prop-types';

import './imageGallery.css';

const ImageGallery = ({ images, modalOpen }) => {
  return (
    <ul className="imageGallery">
      {images.map(({ id, largeImageURL, tags, webformatURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            largeImage={largeImageURL}
            tags={tags}
            preview={webformatURL}
            modalOpen={modalOpen}
          />
        );
      })}
    </ul>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      largeImageURL: propTypes.string.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
    })
  ).isRequired,
  modalOpen: propTypes.func.isRequired,
};

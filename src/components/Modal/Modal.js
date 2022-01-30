import './modal.css';
import propTypes from 'prop-types';

const Modal = ({ largeImageURL, alt, onClick }) => {
  return (
    <div className="overlay" onClick={onClick}>
      <div className="modal">
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
};
export default Modal;

Modal.propTypes = {
  largeImageURL: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

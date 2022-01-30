import propTypes from 'prop-types';
import './button.css';

const Button = ({ onClick }) => {
  return (
    <button className="button" type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

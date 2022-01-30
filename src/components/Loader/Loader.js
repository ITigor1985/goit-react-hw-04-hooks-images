import { SpinnerCircular } from 'spinners-react/lib/esm/SpinnerCircular';

const Loader = () => {
  const style = {
    display: 'block',
    margin: '0 auto',
  };
  return (
    <SpinnerCircular
      style={style}
      size={50}
      thickness={100}
      speed={100}
      color="rgba(57, 62, 172, 1)"
      secondaryColor="rgba(0, 0, 0, 0.44)"
    />
  );
};
export default Loader;

import PropTypes from 'prop-types';

const Error = ({
  error,
}) => (
  <div className="error main">
    {error}
    .
    {' '}
    Please try again.
  </div>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;

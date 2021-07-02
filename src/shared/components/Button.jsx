import React from "react";
import { Button as Btn } from "reactstrap";
import { PulseLoader } from "react-spinners";
import PropTypes from "prop-types";

const Button = ({
  disabled,
  loading,
  text,
  loadingIndicatorSize,
  loadingIndicatorColor,
  ...othersProps
}) => (
  <Btn className="text-white" {...othersProps} disabled={disabled || loading}>
    {loading ? (
      <PulseLoader size={loadingIndicatorSize} color={loadingIndicatorColor} />
    ) : (
      text
    )}
  </Btn>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  loadingIndicatorSize: PropTypes.number,
  loadingIndicatorColor: PropTypes.string
};

Button.defaultProps = {
  loading: false,
  disabled: false,
  loadingIndicatorSize: 10,
  loadingIndicatorColor: "#fff"
};

export default Button;

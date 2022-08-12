import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types'; 

export default function AlertBanner({message, variant}) {
  const alertMessage = message || "An unexpected error occurred. Please try again later";
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{backgroundColor: 'red'}}>{alertMessage}</Alert>
  )
}

AlertBanner.defaultProps = {
  message: "An unexpected error occurred. Please try again later",
  variant: "danger"
}

AlertBanner.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
}

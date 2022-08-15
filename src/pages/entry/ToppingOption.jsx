import React from 'react';
import { Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ToppingOption({name, imagePath, updateItemCount}) {
  const handleChange = (e) => {
    updateItemCount(name, e.target.checked? 1: 0);
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: "center"}}>
      <img  style={{width: "75%"}}
      src={`http://localhost:3000/${imagePath}`}
      alt={`${name} toppings`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
      <Form.Check
      type="checkbox"
      onChange={handleChange}
      label={name}
      />
      </Form.Group>
    </Col> 
  )
}

ToppingOption.defaultProps = {
  name: '',
  imagePath: '',
  updateItemCount: ''
}

ToppingOption.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
  updateItemCount: PropTypes.func,
}

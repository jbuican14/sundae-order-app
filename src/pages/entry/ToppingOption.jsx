import React from 'react';
import { Col } from 'react-bootstrap';

export default function ToppingOption({name, imagePath}) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: "center"}}>
      <img  style={{width: "75%"}}
      src={`http://localhost:3000/${imagePath}`}
      alt={`${name} toppings`}
      />
    </Col>
  )
}

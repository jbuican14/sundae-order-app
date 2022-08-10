import axios from "axios";
import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";

import ScoopOption from "./ScoopOption";
import ToppingOption from './ToppingOption';

// eslint-disable-next-line react/prop-types
export default function Options({optionType}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios
      .get(`http://localhost:3000/${optionType}`)
      .then((res) => setItems(res.data))
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        // TODO: handle error response
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <Row>{optionItems}</Row>;
}

import axios from "axios";
import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";

import ScoopOption from "./ScoopOption";

// eslint-disable-next-line react/prop-types
export default function Options({optionType}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios
      .get(`http://localhost:3000/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => {
        // TODO: handle error response
      });
  }, [optionType]);

  // TODO: replace null with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <Row>{optionItems}</Row>;
}

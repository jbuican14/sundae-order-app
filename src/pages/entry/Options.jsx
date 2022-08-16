import axios from "axios";
import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';

import AlertBanner from '../common/AlertBanner';
import ScoopOption from "./ScoopOption";
import ToppingOption from './ToppingOption';

// eslint-disable-next-line react/prop-types
export default function Options({optionType}) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false); 
  const [OrderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios
      .get(`http://localhost:3030/${optionType}`, {
        headers: {
          'Access-Control-Allow-Origin': "*",
           "accepts":"application/json"
        
        },
      })
      .then((res) => setItems(res.data))
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setError(true)
      });
  }, [optionType]);

  if(error) {
   return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
    />
  ));
  return (
  <>
  <h2>{optionType}</h2>
  <p>{pricePerItem[optionType]} each</p>
  <p>{optionType} total: {OrderDetails.totals[optionType]}</p>
  <Row>{optionItems}</Row>
  </>
  );
}

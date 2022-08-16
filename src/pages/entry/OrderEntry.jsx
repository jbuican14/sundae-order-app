import React from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import Options from './Options'


export default function OrderEntry() {
  const [orderDetails] = useOrderDetails();
  
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>grand total:{orderDetails.totals.grandTotal}</h2>
    </div>
  )
}

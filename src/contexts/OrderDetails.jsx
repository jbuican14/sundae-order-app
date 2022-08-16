import React, {createContext, useContext, useState, useMemo, useEffect} from 'react';

import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';
const OrderDetails = createContext();

// custom hook to check if we are inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if(!context) {
    throw new Error("useOrderDetails must be used within an OrderDetailsProvider");
  }

  return context;
}

function calSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for(const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  
  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0); 

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  });

  useEffect(()=> {
    const scoopsSubtotal = calSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    })
  }, [optionCounts])

  // useMemo will only recompute the memoized value when one of the deps has changed.
  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts}

      //  update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    // getter: object containing options counts for scoops & toppings, subtol + tol
    // setter: updateOptionCount
    return [{...optionCounts, totals}, updateItemCount]
  },[optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}


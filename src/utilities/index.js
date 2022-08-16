//  format number as currency
/**
* @function formatCurrency
 * @param  {number} amt
 */
export function formatCurrency(amt) {
  return new Intl.NumberFormat('en-GB', {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2
  }).format(amt)
}
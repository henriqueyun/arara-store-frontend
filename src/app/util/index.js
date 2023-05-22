/**
 * Returns value formatted in BRL currency
 * @param {number} value value number to be formatted
 * @returns
 */
function formatCurrency(value) {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function calculateDiscount(price, discount) {
  return price - (price / 100) * discount;
}
export { formatCurrency, calculateDiscount };

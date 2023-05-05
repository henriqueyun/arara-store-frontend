function formatCurrency(value) {
    // alert(value)
    if (value) {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }
    value = 0
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function calculateDiscount(price, discount) {
    return price - ((price / 100) * discount)
}
export { formatCurrency, calculateDiscount }
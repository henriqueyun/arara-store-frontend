function update(address) {
  localStorage.setItem('address', JSON.stringify(address));
}

function get() {
  const storedAddress = JSON.parse(localStorage.getItem('address'));
  return storedAddress || '';
}

export default { update, get };

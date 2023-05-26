function getId() {
  const { id } = JSON.parse(localStorage.getItem('loggedUser'));
  return id || '';
}

export default { getId };

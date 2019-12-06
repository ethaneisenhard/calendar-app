export const setEvent = (store, data) => {
  const eventData = data;
  store.setState({ eventData })

  //acts like Post server request
  localStorage.setItem('eventData', eventData);
}

export const getEvent = (data) => {
  const eventData = data;

  //acts like Get server request
  return localStorage.getItem('eventData', eventData);
}


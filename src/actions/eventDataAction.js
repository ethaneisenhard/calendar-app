const axios = require('axios');

export const setEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);

  store.setState({ eventData });

  axios.post('http://localhost:3000/events', {
    id: parseData.id,
    title: parseData.title,
    location: parseData.location,
    startDate: parseData.startDate, 
    endDate: parseData.endDate,
    description: parseData.description,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}

export const updateEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);

  store.setState({ eventData });

  axios.put('http://localhost:3000/events/'+parseData.id, {
    id: parseData.id,
    title: parseData.title,
    location: parseData.location,
    startDate: parseData.startDate, 
    endDate: parseData.endDate,
    description: parseData.description,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}

export const getEvent = (data) => {
  const eventData = data;

  //acts like Get server request
  // return localStorage.getItem('EventDataArray', eventData);
}


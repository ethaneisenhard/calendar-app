const axios = require('axios');

export const setEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);

  var eventDetails = {};
  eventDetails.id = parseData.id
  eventDetails.title = parseData.title
  eventDetails.location = parseData.location
  eventDetails.startDate = parseData.startDate 
  eventDetails.endDate = parseData.endDate
  eventDetails.description = parseData.description 

  store.setState({ eventData });

  axios.post('http://localhost:3000/events', {
    eventDetails
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
  return localStorage.getItem('EventDataArray', eventData);
}


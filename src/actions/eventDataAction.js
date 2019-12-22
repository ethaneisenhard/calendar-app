const axios = require('axios');

export const setEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);

  const community = parseData.community;

  const url = "http://localhost:3000/calendar/"+community+"/addEvent"

  const formData = {
    id: parseData.id,
    title: parseData.title,
    location: parseData.location,
    startDate: parseData.startDate, 
    endDate: parseData.endDate,
    description: parseData.description
  }

  const config = {
    headers: {
      'content-type': 'application/json'
    }
  }

  axios.post(url, formData, config)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  store.setState({ eventData });

}

export const updateEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);  
  const community = parseData.community;

  const url = "http://localhost:3000/calendar/"+community+"/updateEvent"

  const formData = {
    id: parseData.id,
    title: parseData.title,
    location: parseData.location,
    startDate: parseData.startDate, 
    endDate: parseData.endDate,
    description: parseData.description
  }

  const config = {
    headers: {
      'content-type': 'application/json'
    }
  }

  axios.patch(url, formData, config)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  store.setState({ eventData });

}

export const rsvpEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);  
  const community = parseData.community;

  const url = "http://localhost:3000/calendar/"+community+"/rsvpEvent"

  const formData = {
    id: parseData.id,
    title: parseData.title,
    name: parseData.name,
    email: parseData.email,
    guests: parseData.guests, 
    rsvp: parseData.rsvp
  }

  const config = {
    headers: {
      'content-type': 'application/json'
    }
  }

  axios.patch(url, formData, config)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  store.setState({ eventData });

}


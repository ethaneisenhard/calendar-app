const axios = require('axios');

export const setEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);

  const community = parseData.community;

  const url = "http://localhost:3000/calendar/"+community+"/addEvent"

  const formData = {
    id: parseData.id,
    title: parseData.title,
    eventLocation: parseData.eventLocation,
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
    eventLocation: parseData.eventLocation,
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
    fullName: parseData.fullName,
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

export const deleteEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);  
  const community = parseData.community;

  const url = "http://localhost:3000/calendar/"+community+"/deleteEvent"

  axios.delete(url, { data: { id: parseData.id } })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  store.setState({ eventData });

}


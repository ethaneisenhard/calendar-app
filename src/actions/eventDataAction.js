const axios = require('axios');

export const setEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);

  const community = parseData.community;

  console.log(community)

  const url = "http://localhost:3000/calendar/"+community+"/addEvent"

  const formData = {
    id: parseData.id,
    title: parseData.title,
    // heroImage: parseData.heroImage,
    eventLocation: parseData.eventLocation,
    dailyActivity: parseData.dailyActivity, 
    startDate: parseData.startDate, 
    endDate: parseData.endDate,
    description: parseData.description, 
    availableSpots: parseData.availableSpots, 
    repeats: parseData.repeats, 
    every: parseData.every, 
    daysOfWeek: parseData.daysOfWeek, 
    daysOfMonth: parseData.daysOfMonth, 
    monthsOfYear: parseData.monthsOfYear, 
    dayNumber: parseData.dayNumber, 
    dayType: parseData.dayType, 
    ogStartDate: parseData.ogStartDate, 
    ogEndDate: parseData.ogEndDate
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

  // store.setState({ eventData });

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
    ogStartDate: parseData.ogStartDate, 
    ogEndDate: parseData.ogEndDate,
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

  // store.setState({ eventData });

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
    rsvpList: parseData.rsvpList,
    rsvpOBJ: parseData.rsvpOBJ,
    dateOfEvent: parseData.dateOfEvent
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

  // store.setState({ eventData });

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

  // store.setState({ eventData });

}

export const getEventByTitle = async (store, community, eventID, request = axios) => {
  const status = "LOADING";
  store.setState({ status });
  try {
    const response = await request.get(
      "http://localhost:3000/calendar/" + community + "/event/" + eventID
    );
    const eventData = response.data;
    const iseventDataEmpty = eventData.length === 0;
    const status = iseventDataEmpty ? "EMPTY" : "SUCCESS";
    store.setState({ eventData, status });
  } catch (error) {
    const isError404 = error.response && error.response.status === 404;
    const status = isError404 ? "NOT_FOUND" : "ERROR";
    store.setState({ status });
  }
};



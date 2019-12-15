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

export const rsvpEvent = (store, data) => {
  const eventData = data;
  const parseData = JSON.parse(eventData);  

  const rsvpArray = [parseData];
  //remove duplicate ID from Object
  const removeID = rsvpArray.map(({id, ...keepAttrs}) => keepAttrs)

  axios.patch('http://localhost:3000/events/'+parseData.id, {
    rsvp: removeID
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  store.setState({ eventData });

}

// export const getEvents = (store) => {
//   axios.get('http://localhost:3000/events/', {
//   })
//   .then(function (response) {
//     console.log(response);
//     const allEvents = response;
//     store.setState({ allEvents });
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }

export const getEvents = async (store, request = axios) => {
  try {
    const response = await request.get(
      `http://localhost:3000/events/`
    );
    const allEvents = response.data;
    store.setState({ allEvents });
  } catch (error) {
    console.log(error)
  }
};


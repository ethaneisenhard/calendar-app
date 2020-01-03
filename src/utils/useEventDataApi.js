import {useState, useEffect } from 'react';
import axios from 'axios';

const useEventDataApi = (initialUrl, initialData) => {
    const [eventData, setEventData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [status, setStatus] = useState("LOADING");

    useEffect(() => {
      const fetchData = async () => {
        setStatus("LOADING");
        try {
          const result = await axios(url);
          const eventData = result.data;
          const isEventDataEmpty = eventData.length === 0;
          const status = isEventDataEmpty ? "EMPTY" : "SUCCESS";
          setEventData(eventData);
          setStatus(status);
        } catch (error) {
          const isError404 = error.response && error.response.status === 404;
          const status = isError404 ? "NOT_FOUND" : "ERROR";
          setStatus(status);
        }
      };
      fetchData();
    }, [url]);
    return [{ eventData, status }, setUrl];
  };

export default useEventDataApi
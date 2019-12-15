import React, { useState, useEffect }  from 'react'
import axios from "axios"

const AllEvents = ()  => {

  const [eventData, getEventData] = useState({});
  const [url, setUrl] = useState(
    'http://localhost:3000/events/',
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(url);
      getEventData(result.data);
      setIsLoading(false);
    };
    fetchData();
    
  }, [url]);
    

    return(
        <div>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
            <div>
                <pre>{JSON.stringify(eventData, null, 4)}</pre>
            </div>
            )}
        </div>
    )
}

export default AllEvents
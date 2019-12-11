import React from "react"
import useGlobal from "../store/eventData";

const LocalStorage = () => {
  const [globalState, globalActions] = useGlobal();
  var localEventData = localStorage.getItem('EventDataArray');

  return (
      <div>
        <h3>Local Storage ("Acts Like A Server") </h3>
        <p>*Refresh after each submit to see update to "Server"</p>
      
          <pre>
            {localEventData}
          </pre>
      </div>
  )
}

export default LocalStorage

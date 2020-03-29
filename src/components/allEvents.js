import React from "react";
import useEventDataApi from "../utils/useEventDataApi";

const AllEvents = props => {

  var capitalizeCommunity = props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-"+capitalizeCommunity;

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" + tableName + "/"
  );

  return (
    <div>
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div>
          <pre>{JSON.stringify(eventData, null, 4)}</pre>
        </div>
      )}
    </div>
  );
};

export default AllEvents;

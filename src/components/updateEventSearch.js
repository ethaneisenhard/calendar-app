import React from "react"
import { navigate } from "gatsby"
import useGlobal from "../store/eventData"
import useEventDataApi from "../utils/useEventDataApi"
import moment from "moment";
import { useForm } from "react-hook-form";


const EventSearch = props => {
  const { register, handleSubmit, errors } = useForm();
  const [globalState, globalActions] = useGlobal()

  var capitalizeCommunity = props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-"+capitalizeCommunity;

  const updateEventSearchForm = data => {
    // const stringData = JSON.stringify(data)
    console.log(data)

    var shownVal = document.getElementById("data-choice")
    
    var checkSearchNull = document.querySelector("#data option[value='" + shownVal.value + "']")
    
    if(checkSearchNull !== null){
      var value2send = document.querySelector("#data option[value='" + shownVal.value + "']").getAttribute("data-value")
    }

    // globalActions.getEventByTitle(tableName, value2send)

    navigate(
      "app/dashboard/calendar/" + props.community + "/updateEvent/" + value2send + "/"
    )
    
    console.log("searchForEvent")
  }

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" + tableName + "/" 
  );

  console.log(status)


  return (
    <section id = "updateEventSearch">
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div className = "updateEventSearch-wrapper">
          <h2>Find and Update an Event</h2>
          <form
            id="searchEventForm"
            onSubmit={handleSubmit(updateEventSearchForm)}
          >
            <input
              name="id"
              defaultValue={props.eventID}
              hidden
            />
            <input
              name="community"
              defaultValue={tableName}
              hidden
            />
            <label htmlFor="data-choice">Search for an Event:</label>
            <input
              list="data"
              id="data-choice"
              name="dataChoice"
              ref={register}
            />
            <datalist id="data" name ="searchEventTitle">
              {eventData.map((item, key) => (
                <option key={key} data-value={item.id} value={`${item.title} | ${moment(item.info.startDate).format("MM-DD-YYYY")} (${key})`}>
                </option>
              ))}
            </datalist>
            <input type="submit" />
          </form>
        </div>
      )}
      {props.children}
    </section>
  )
}

export default EventSearch

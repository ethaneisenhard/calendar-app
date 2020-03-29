import React from "react"
import { navigate } from "gatsby"
import {useForm} from "react-hook-form"
import useGlobal from "../store/eventData"
import useEventDataApi from "../utils/useEventDataApi"

const DeleteEventSearch = props => {
  const { register, handleSubmit, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  var capitalizeCommunity = props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-"+capitalizeCommunity;

  const updateEventSearchForm = () => {
    // const stringData = JSON.stringify(data)

    var shownVal = document.getElementById("data-choice")
    var checkSearchNull = document.querySelector("#data option[value='" + shownVal.value + "']")
    
    if(checkSearchNull !== null){
      var value2send = document.querySelector("#data option[value='" + shownVal.value + "']").getAttribute("data-value")
    }
    
    navigate(
      "app/dashboard/calendar/" + props.community + "/deleteEvent/" + value2send + "/"
    )

    globalActions.getEventByTitle(tableName, value2send)
    console.log("searchForEvent")
  }

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" + tableName + "/"
  );


  return (
    <section id = "deleteEventSearch">
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div className="deleteEventSearch-wrapper">
          <h2>Find and Delete an Event</h2>
          {/* all forms must be required */}
          <form
            id="searchEventForm"
            onSubmit={handleSubmit(updateEventSearchForm)}
          >
            <input
              name="id"
              defaultValue={props.eventID}
              ref={register}
              hidden
            />
            <input
              name="community"
              defaultValue={props.community}
              ref={register}
              hidden
            />
            <label htmlFor="data-choice">Search for an Event:</label>
            <input
              list="data"
              id="data-choice"
              name="dataChoice"
              ref={register}
            />
            <datalist id="data">
              {eventData.map((item, key) => (
                <option key={key} data-value={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </datalist>
            {errors.exampleRequired && <p>This field is required</p>}
            <input type="submit" />
          </form>
        </div>
      )}
      {props.children}
    </section>
  )
}

export default DeleteEventSearch

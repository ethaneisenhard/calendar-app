import React from "react"
import { navigate, Link } from "gatsby"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"

import "../styles/createEvent.scss"

const EventSearch = props => {
  const { register, handleSubmit, errors } = useForm()
  const [globalState, globalActions] = useGlobal()
  const { status, eventData } = globalState

  const updateEventSearchForm = data => {
    const stringData = JSON.stringify(data)

    var shownVal = document.getElementById("event-search")

    var checkNullSearch = document.querySelector("#eventSearch option[value='" + shownVal.value + "']")

    if(checkNullSearch !== null){
      var eventID = document.querySelector("#eventSearch option[value='" + shownVal.value + "']").getAttribute("data-value")
    }
    
    navigate(
      "app/dashboard/calendar/" + props.community + "/updateEvent/" + eventID + "/"
    )

    globalActions.getEventByTitle(props.community, eventID)
    console.log("searchForEvent")
  }

  if(eventData.length === 0 && status === "INITIAL"){
    globalActions.getAllEventsByCommunity(props.community)
  }

  return (
    <section>
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && (
        <div>
            <h4>Search Result Not Found</h4>
            {<Link to = {`/app/dashboard/calendar/${props.community}/updateEvent`}>Search Again</Link>}
        </div>
      )}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div>
          <h1>Find and Update an Event</h1>
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
            <label htmlFor="event-search">Search for an Event:</label>
            <input
              list="eventSearch"
              id="event-search"
              name="eventSearchList"
              ref={register({ required: true })}
            />
            <datalist id="eventSearch">
              {eventData.map((item, key) => (
                <option key={key} data-value={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </datalist>
            {errors.eventSearchList && <p>Please type into the search field</p>}
            <input type="submit" />
          </form>
        </div>
      )}
      {props.children}
    </section>
  )
}

export default EventSearch

import React, { useState, useEffect } from "react"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import useEventDataApi from "../utils/useEventDataApi"

import "../styles/createEvent.scss"
import "react-datepicker/dist/react-datepicker.css"

const ReadEvent = props => {
  const { register, handleSubmit, setValue, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  const rsvpEvent = data => {
    const stringData = JSON.stringify(data)
    globalActions.rsvpEvent(stringData)

    alert("RSVP Sent!")
    console.log("rsvpEvent")

  }

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" + props.community + "/" + "event/" + props.eventID + ""
  );

  return (
    <div>
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div>
          {/* <pre>{JSON.stringify(eventData, null, 4)}</pre> */}
          <ul>
            <li>{JSON.stringify(eventData[0].id)}</li>
            <li>{JSON.stringify(eventData[0].title)}</li>
            <li>{JSON.stringify(eventData[0].info.eventLocation)}</li>
            <li>{JSON.stringify(eventData[0].info.startDate)}</li>
            <li>{JSON.stringify(eventData[0].info.endDate)}</li>
            <li>{JSON.stringify(eventData[0].info.description)}</li>
            <li>{JSON.stringify(eventData[0].info.rsvp)}</li>
          </ul>
          {/* all forms must be required */}
          <form id="createEventForm" onSubmit={handleSubmit(rsvpEvent)}>
            <input
              name="id"
              defaultValue={props.eventID}
              ref={register}
              hidden
            />
            <input
              name="title"
              defaultValue={eventData[0].title}
              ref={register}
              hidden
            />
            <input
              name="community"
              defaultValue={props.community}
              ref={register}
              hidden
            />
            <input
              name="rsvp"
              defaultValue={JSON.stringify(eventData[0].info.rsvp)}
              ref={register}
              hidden
            />
            <label>fullName</label>
            <input name="fullName" defaultValue="" ref={register} />
            <label>Email</label>
            <input name="email" defaultValue="" ref={register} />
            <label>Amount of Guests</label>
            <input name="guests" defaultValue="" ref={register} />
            {errors.exampleRequired && <p>This field is required</p>}
            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  )
}

export default ReadEvent

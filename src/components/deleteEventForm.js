import React from "react"
import { navigate } from "gatsby"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"

import "../styles/createEvent.scss"

const DeleteEvent = props => {
  const { register, handleSubmit, setValue, errors } = useForm()
  const [globalState, globalActions] = useGlobal()
  const { status, eventData } = globalState

  const deleteEvent = data => {
    const stringData = JSON.stringify(data)

    globalActions.deleteEvent(stringData)

    alert("Deleted Event")

    navigate(
      "app/dashboard/calendar/" + props.community + "/deleteEvent"
    )

    console.log("deleteEvent")
  }

  if(eventData.length === 0 && status === "INITIAL"){
    globalActions.getEventByTitle(props.community, props.eventID)
  }

  return (
    <section>
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "SUCCESS" && (
        <div>
          <ul>
            <li>{JSON.stringify(eventData[0].id)}</li>
            <li>{JSON.stringify(eventData[0].title)}</li>
            <li>{JSON.stringify(eventData[0].info.eventLocation)}</li>
            <li>{JSON.stringify(eventData[0].info.startDate)}</li>
            <li>{JSON.stringify(eventData[0].info.endDate)}</li>
            <li>{JSON.stringify(eventData[0].info.description)}</li>
            <li>{JSON.stringify(eventData[0].info.rsvp)}</li>
          </ul>
          <form id="createEventForm" onSubmit={handleSubmit(deleteEvent)}>
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
            <p>Delete Event</p>
            {errors.exampleRequired && <p>This field is required</p>}
            <input type="submit" />
          </form>
        </div>
      )}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {/* <pre>{JSON.stringify(eventData[0], null, 4)}</pre> */}
    </section>
  )
}

export default DeleteEvent

import React, { useState, useEffect } from "react"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import axios from "axios"

import "../styles/createEvent.scss"

const DeleteEvent = props => {
  const { register, handleSubmit, setValue, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  const deleteEvent = data => {
    const stringData = JSON.stringify(data)
    globalActions.deleteEvent(stringData)
    console.log("deleteEvent")
  }
 
  const [eventData, getEventData] = useState({})
  const [url, setUrl] = useState(
    "http://localhost:3000/calendar/" + props.community + "/" + "event/" + props.eventID + ""
  )

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try{
        const result = await axios.get(url)
        getEventData(result.data)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [url])

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {/* <pre>{JSON.stringify(eventData[0], null, 4)}</pre> */}
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
            <input type="submit"/>
          </form>
        </div>
      )}
      <h3>Data Response</h3>
      <pre>{globalState.eventData}</pre>
    </div>
  )
}

export default DeleteEvent

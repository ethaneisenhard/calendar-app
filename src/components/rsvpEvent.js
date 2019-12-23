import React, { useState, useEffect } from "react"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import axios from "axios"

import "../styles/createEvent.scss"
import "react-datepicker/dist/react-datepicker.css"

const ReadEvent = props => {
  const { register, handleSubmit, setValue, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  const rsvpEvent = data => {
    const stringData = JSON.stringify(data)
    globalActions.rsvpEvent(stringData)
    console.log("rsvpEvent")
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
        const result = await axios.get(url, {
          // Axios looks for the `auth` option, and, if it is set, formats a
          // basic auth header for you automatically.
          auth: {
            users: { 'admin': 'supersecret' }
          }
        });
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
      <h3>Data Response</h3>
      <pre>{globalState.eventData}</pre>
    </div>
  )
}

export default ReadEvent

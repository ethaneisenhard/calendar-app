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
    "http://localhost:3000/events/" + props.eventID + ""
  )

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await axios.get(url)
      getEventData(result.data)
      setIsLoading(false)
    }
    fetchData()
  }, [url])

  return (
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <ul>
            <li>{eventData.id}</li>
            <li>{eventData.title}</li>
            <li>{eventData.location}</li>
            <li>{eventData.startDate}</li>
            <li>{eventData.endDate}</li>
            <li>{eventData.description}</li>
          </ul>
          <form id="createEventForm" onSubmit={handleSubmit(rsvpEvent)}>
            <input
              name="id"
              defaultValue={eventData.id}
              ref={register}
              hidden
            />
            <label>Name</label>
            <input name="name" defaultValue="" ref={register} />
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

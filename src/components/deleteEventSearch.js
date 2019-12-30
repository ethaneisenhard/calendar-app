import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import axios from "axios"

import "../styles/createEvent.scss"

const DeleteEventSearch = props => {
  const { register, handleSubmit, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  const updateEventSearchForm = data => {
    const stringData = JSON.stringify(data)

    var shownVal = document.getElementById("data-choice")
    
    var value2send = document.querySelector("#data option[value='" + shownVal.value + "']").getAttribute("data-value")

    navigate(
      "app/dashboard/calendar/" + props.community + "/deleteEvent/" + value2send + "/"
    )

    globalActions.getEventByTitle(props.community, value2send)
    console.log("searchForEvent")
  }

  const [eventData, getEventData] = useState()
  const [url, setUrl] = useState(
    "http://localhost:3000/calendar/" + props.community + "/"
  )

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
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
          <h1>Find and Delete an Event</h1>
          {/* <pre>{JSON.stringify(eventData, null, 4)}</pre> */}
          {/* <pre>
                {eventData.map((item, key) => (
                  <ul key={key} >
                      <li>{item.title}</li>
                  </ul>
                ))}
            </pre> */}
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
    </div>
  )
}

export default DeleteEventSearch

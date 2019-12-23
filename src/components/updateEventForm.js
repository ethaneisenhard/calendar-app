import React, { useState, useEffect } from "react"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import DatePicker from "react-datepicker"
import moment from "moment"
import axios from "axios"
import DateTimePicker from 'react-datetime-picker'

import "../styles/createEvent.scss"
import "react-datepicker/dist/react-datepicker.css"

const UpdateEvent = props => {

  const { register, handleSubmit, setValue, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const updateEvent = data => {
    const stringData = JSON.stringify(data)
    globalActions.updateEvent(stringData)
    console.log("updateEvent")
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
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
      <div>
      <form id="createEventForm" onSubmit={handleSubmit(updateEvent)}>
        <input name="id" defaultValue={eventData[0].id} ref={register} hidden />
        <input name="community" defaultValue={props.community} ref={register} hidden />
        <label>Title</label>
        <input name="title" defaultValue={eventData[0].title} ref={register} />
        <label>eventLocation</label>
        <input name="eventLocation" defaultValue={eventData[0].info.eventLocation} ref={register} />
        <div className="date">
          <label>Start Time</label>
          <input
            name="startDate"
            defaultValue={eventData[0].info.startDate}
            hidden
            ref={register}
          />
          <DatePicker
            selected = {startDate}
            onChange={date  => setStartDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MM/dd/yyyy h:mm aa"
            placeholderText = {eventData[0].info.startDate}
          />
          <label>End Time</label>
          <input
            name="endDate"
            defaultValue={eventData[0].info.endDate}
            hidden
            ref={register}
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MM/dd/yyyy h:mm aa"
            placeholderText={eventData[0].info.endDate}
          />
        </div>
        <label htmlFor="">Descriptions</label>
        <textarea
          name="description"
          id=""
          cols="30"
          rows="2"
          defaultValue={eventData[0].info.description}
          ref={register}
        ></textarea>
        {errors.exampleRequired && <p>This field is required</p>}
        <input
          type="submit"
          onClick={() => {
            setValue("startDate", startDate == null ? eventData[0].info.startDate: startDate)
            setValue("endDate", endDate == null ? eventData[0].info.endDate: endDate)
          }}
        />
      </form>
      </div>
      )}
      <h3>Data Response</h3>
      <pre>{globalState.eventData}</pre>
    </div>
  )
}

export default UpdateEvent

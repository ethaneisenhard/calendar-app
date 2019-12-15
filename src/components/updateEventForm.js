import React, { useState, useEffect } from "react"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import DatePicker from "react-datepicker"
import moment from "moment"
import axios from "axios"

import "../styles/createEvent.scss"
import "react-datepicker/dist/react-datepicker.css"

const UpdateEventTemplate = props => {
  const { register, handleSubmit, setValue, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const updateEvent = data => {
    const stringData = JSON.stringify(data)
    globalActions.updateEvent(stringData)
    console.log("updateEvent")
  }

  const [eventData, getEventData] = useState({});
  const [url, setUrl] = useState(
    'http://localhost:3000/events/'+props.eventID +'',
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(url);
      getEventData(result.data);
      setIsLoading(false);
    };
    fetchData();
    
  }, [url]);

  return (
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
      <div>
      <form id="createEventForm" onSubmit={handleSubmit(updateEvent)}>
        <input name="id" defaultValue={eventData.id} ref={register} hidden />
        <label>Title</label>
        <input name="title" defaultValue={eventData.title} ref={register} />
        <label>Location</label>
        <input name="location" defaultValue={eventData.location} ref={register} />
        <div className="date">
          <label>Start Time</label>
          <input
            name="startDate"
            defaultValue={moment(eventData.startDate).toDate()}
            hidden
            ref={register}
          />
          <DatePicker
            selected={moment(eventData.startDate).toDate()}
            onChange={date => setStartDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy hh:mm aa"
          />
          <label>End Time</label>
          <input
            name="endDate"
            defaultValue={moment(eventData.endDate).toDate()}
            hidden
            ref={register}
          />
          <DatePicker
            selected={moment(eventData.endDate).toDate()}
            onChange={date => setEndDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy hh:mm aa"
          />
        </div>
        <label htmlFor="">Descriptions</label>
        <textarea
          name="description"
          id=""
          cols="30"
          rows="2"
          defaultValue={eventData.description}
          ref={register}
        ></textarea>
        {errors.exampleRequired && <p>This field is required</p>}
        <input
          type="submit"
          onClick={() => {
            setValue("startDate", startDate)
            setValue("endDate", endDate)
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

export default UpdateEventTemplate

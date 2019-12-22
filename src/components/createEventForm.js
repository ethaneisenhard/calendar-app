import React, { useState } from "react"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import shortid from "shortid"
import DatePicker from "react-datepicker"

import "../styles/createEvent.scss"
import "react-datepicker/dist/react-datepicker.css"

const CreateEventForm = props => {
  const { register, handleSubmit, setValue, errors } = useForm()
  const [globalState, globalActions] = useGlobal()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const createEvent = data => {
    const stringData = JSON.stringify(data)
    globalActions.setEvent(stringData)
    console.log("createEvent")
  }

  const id = shortid()

  return (
    <div>
      <form id="createEventForm" onSubmit={handleSubmit(createEvent)}>
        <input name="id" defaultValue={id} ref={register} hidden />
        <input name="community" defaultValue={props.community} ref={register} hidden />
        <label>Title</label>
        <input name="title" defaultValue="" ref={register} />
        <label>Location</label>
        <input name="location" defaultValue="" ref={register} />
        
        <div className = "date">
          <label>Start Time</label>
          <input name="startDate" hidden ref={register}/>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy hh:mm aa"
          />
          <label>End Time</label>
          <input name="endDate" hidden ref={register}/>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy hh:mm aa"
          />
        </div>
        <label htmlFor="">Descriptions</label>
        <textarea name="description" id="" cols="30" rows="2" ref={register}></textarea>
        {errors.exampleRequired && <p>This field is required</p>}
        <input type="submit" onClick={() => {
              setValue('startDate', startDate)
              setValue('endDate', endDate)
        }}/>
      </form>

      <h3>Data Response</h3>
      <pre>{globalState.eventData}</pre>
    </div>
  )
}

export default CreateEventForm

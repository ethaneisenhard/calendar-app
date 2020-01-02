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
    alert("Event Created")
    console.log("createEvent")
  }

  const id = shortid()

  return (
    <div>
      <form id="createEventForm" onSubmit={handleSubmit(createEvent)}>
        <input name="id" defaultValue={id} ref={register} hidden />
        <input name="community" defaultValue={props.community} ref={register} hidden />
        <label>Title</label>
        <input name="title" defaultValue="" ref={register({ required: true })} />
        <label>eventLocation</label>
        <input name="eventLocation" defaultValue="" ref={register({ required: true })} />
        
        <div className = "date">
          <label>Start Time</label>
          <input name="startDate" hidden ref={register({ required: true })}/>
          <DatePicker
            name="startDate2"
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy hh:mm aa"
            required={true}
            ref={register}
          />
          <label>End Time</label>
          <input name="endDate" hidden ref={register({ required: true })}/>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy hh:mm aa"
            required={true}
          />
        </div>
        <label htmlFor="">Descriptions</label>
        <textarea name="description" id="" cols="30" rows="2" ref={register({ required: true })}></textarea>
        {errors.title && <p>Title field is required</p>}
        {errors.eventLocation && <p>Location field is required</p>}
        {errors.description && <p>Description field is required</p>}
        <input type="submit" onClick={() => {
              setValue('startDate', startDate)
              setValue('endDate', endDate)
        }}/>
      </form>
    </div>
  )
}

export default CreateEventForm

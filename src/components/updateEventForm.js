import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import useEventDataApi from "../actions/useEventDataApi"
import DatePicker from "react-datepicker"
import moment from "moment"

import "../styles/updateEvent.scss"
import "react-datepicker/dist/react-datepicker.css"


const UpdateEvent = props => {
  const { register, handleSubmit, setValue, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const updateEvent = data => {
    const stringData = JSON.stringify(data)
    globalActions.updateEvent(stringData)

    alert("Success! Event has been updated")
    navigate("app/calendar/" + props.community + "/updateEvent/")
    console.log("updateEvent")
  }

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" + props.community + "/" + "event/" + props.eventID + ""
  );

  return (
    <section>
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
          <div>
            <form id="updateEventForm" onSubmit={handleSubmit(updateEvent)}>
              <input
                name="id"
                defaultValue={eventData[0].id}
                ref={register}
                hidden
              />
              <input
                name="community"
                defaultValue={props.community}
                ref={register}
                hidden
              />
              <label>Title</label>
              <input
                name="title"
                defaultValue={eventData[0].title}
                ref={register}
              />
              <label>eventLocation</label>
              <input
                name="eventLocation"
                defaultValue={eventData[0].info.eventLocation}
                ref={register}
              />
              <div className="date">
                <label>Start Time</label>
                <input
                  name="startDate"
                  defaultValue={eventData[0].info.startDate}
                  hidden
                  ref={register}
                />
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  showTimeSelect
                  timeFormat="hh:mm aa"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  placeholderText={moment(eventData[0].info.startDate).format("dddd MMMM Do YYYY h:mm a")}
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
                  placeholderText={moment(eventData[0].info.endDate).format("dddd MMMM Do YYYY h:mm a")}
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
                  setValue(
                    "startDate",
                    startDate == null ? eventData[0].info.startDate : startDate
                  )
                  setValue(
                    "endDate",
                    endDate == null ? eventData[0].info.endDate : endDate
                  )
                }}
              />
            </form>
          </div>
      )}

      {/* <h3>Data Response</h3>
      <pre>{globalState.eventData}</pre> */}
    </section>
  )
}

export default UpdateEvent

import React, { useState } from "react"
import { graphql } from "gatsby"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DatePicker from "react-datepicker"
import moment from "moment";

import "../styles/createEvent.scss"
import "react-datepicker/dist/react-datepicker.css"

const UpdateEventTemplate = ({ data }) => {
  const { register, handleSubmit, setValue, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const updateEvent = data => {
    const stringData = JSON.stringify(data)
    globalActions.setEvent(stringData)
    console.log("updateEvent")
  }

  return (
    <Layout>
      <SEO title="Update Event Template" />
      {data.allRestApiEthaneisenhardCalendarappdbEvents.nodes.map(
        ({ eventDetails }) => (
          <div>
            <form id="createEventForm" onSubmit={handleSubmit(updateEvent)}>
              <input name="id" defaultValue={eventDetails.id} ref={register} hidden />
              <label>Title</label>
              <input name="title" defaultValue={eventDetails.title} ref={register} />
              <label>Location</label>
              <input name="location" defaultValue={eventDetails.location} ref={register} />

              <div className="date">
                <label>Start Time</label>
                <input name="startDate" defaultValue={moment(eventDetails.startDate).toDate()} hidden ref={register} />
                <DatePicker
                  selected={moment(eventDetails.startDate).toDate()}
                  onChange={date => setStartDate(date)}
                  showTimeSelect
                  timeFormat="hh:mm aa"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy hh:mm aa"
                />
                <label>End Time</label>
                <input name="endDate" defaultValue={moment(eventDetails.endDate).toDate()} hidden ref={register} />
                <DatePicker
                  selected={moment(eventDetails.endDate).toDate()}
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
                defaultValue={eventDetails.description}
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
        )
      )}
      <h3>Data Response</h3>
      <pre>{globalState.eventData}</pre>
    </Layout>
  )
}

export default UpdateEventTemplate

export const query = graphql`
  query($slug: String!) {
    allRestApiEthaneisenhardCalendarappdbEvents(
      filter: { fields: { slug: { eq: $slug } } }
    ) {
      nodes {
        eventDetails {
          title
          startDate
          location
          endDate
          description
          id
        }
        fields {
          slug
        }
      }
    }
  }
`

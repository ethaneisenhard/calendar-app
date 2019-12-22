import React from 'react'
import { Router } from "@reach/router"
import Layout from "../components/layout"
import UpdateEventForm from "../components/updateEventForm"
import CreateEventForm from "../components/createEventForm"
import ReadEvent from "../components/readEvent"
import Calendar from "../components/calendarLayout"
import AllEvents from "../components/allEvents"
import Test from "../components/test"

const App = () => {
  return (
    <Layout>
      <Router>
        <AllEvents path = "/app/calendar/:community/allEvents/"/>
        <Calendar path="/app/calendar/:community"/>
        <ReadEvent path="/app/calendar/:community/rsvpEvent/:eventID"/>
        <UpdateEventForm path="/app/calendar/:community/updateEvent/:eventID" />
        <CreateEventForm path="/app/calendar/:community/createEvent"/>
        <Test path="/app/test" />
      </Router>
    </Layout>
  )
}
export default App
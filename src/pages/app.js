import React from 'react'
import { Router } from "@reach/router"
import Layout from "../components/layout"
import UpdateEventForm from "../components/updateEventForm"
import CreateEventForm from "../components/createEventForm"
import ReadEvent from "../components/readEvent"
import Calendar from "../components/calendarLayout"
import AllEvents from "../components/allEvents"
import Test from "../components/test"

const Default = ()  => (
    <div>Hi</div>
);

const App = () => {
  return (
    <Layout>
      <Router>
        <AllEvents path = "/app/allEvents/"/>
        <Calendar path="/app/calendar/"/>
        <ReadEvent path="/app/rsvpEvent/:eventID"/>
        <UpdateEventForm path="/app/updateEvent/:eventID" />
        <CreateEventForm path="/app/createEvent"/>
        <Default path="/app" />
        <Test path="/app/test" />
      </Router>
    </Layout>
  )
}
export default App
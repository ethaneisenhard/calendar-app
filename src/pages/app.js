import React from 'react'
import { Router } from "@reach/router"
import Layout from "../components/layout"

import Calendar from "../components/calendarLayout"
import AllEvents from "../components/allEvents"
import RSVPEventForm from "../components/rsvpEventForm"

import Dashboard from '../components/dashboard'
import CreateEventForm from "../components/createEventForm"
import UpdateEventSearch from "../components/updateEventSearch"
import UpdateEventForm from "../components/updateEventForm"
import DeleteEventSearch from "../components/deleteEventSearch"
import DeleteEventForm from "../components/deleteEventForm"

import Test from "../components/test"

const App = () => {
  return (
    <Layout>
      <Router>  
        <AllEvents path = "/app/calendar/:community/allEvents/"/>
        <Calendar path="/app/calendar/:community"/>
        <RSVPEventForm path="/app/calendar/:community/rsvpEvent/:eventID"/>

        <Dashboard path = "/app/dashboard/calendar/:community/"/>

        <CreateEventForm path="/app/dashboard/calendar/:community/createEvent"/>
        <UpdateEventSearch path = "/app/dashboard/calendar/:community/updateEvent/">
          <UpdateEventForm path="/:eventID" />
        </UpdateEventSearch>
        <DeleteEventSearch path = "/app/dashboard/calendar/:community/deleteEvent/">
          <DeleteEventForm path="/:eventID"/>
        </DeleteEventSearch>
        
        <Test path="/app/test" />
      </Router>
    </Layout>
  )
}
export default App
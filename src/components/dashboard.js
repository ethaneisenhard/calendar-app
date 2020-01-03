import React from "react"
import { Link } from "gatsby"

import "../styles/dashboard.scss"

const Dashboard = props => {
   var currentPath = window.location.pathname

  return (
    <section id="dashboard">
      <header className="d-header">
        <div className="d-header-left">
          <h3>Admin Panel</h3>
          <p>{props.community}</p>
        </div>
        <div className="d-header-right">
          <Link to={`${currentPath}/createEvent`}>Create Event</Link>
          <Link to={`${currentPath}/updateEvent`}>Update Event</Link>
          <Link to={`${currentPath}/deleteEvent`}>Delete Event</Link>

          <br></br>
          <Link to={`app/calendar/Azure/`}>Calendar</Link>
         
        </div>
      </header>
      <section className = "publishedEvents">
            <h4>Published Events</h4>
      </section>
    </section>
  )
}

export default Dashboard

import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import UpdateEventForm from "../components/updateEventForm"

const UpdateEvent = () => (
  <Layout>
    <SEO title="Update Event" />
    <p>Update</p>
    <UpdateEventForm/>
    <br></br>
    <Link to="/createEvent/">Create Event</Link>
  </Layout>
)

export default UpdateEvent

import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CreateEventForm from "../components/createEventForm"
import LocalStorage from "../components/localStorage"

const CreateEvent = () => (
  <Layout>
    <SEO title="Create Event" />
    <p>Create</p>
    <CreateEventForm/>
    <br></br>
    <LocalStorage/>
    <Link to="/updateEvent/">Update Event</Link>
  </Layout>
)

export default CreateEvent

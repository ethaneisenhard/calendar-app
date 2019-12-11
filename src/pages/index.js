import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link to="/calendar/">Calendar</Link>
    <br></br>
    <Link to="/createEvent/">Create Event</Link>
    <br></br>
    <Link to="/updateEvent/">Update Event</Link>
  </Layout>
)

export default IndexPage

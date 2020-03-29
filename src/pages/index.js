import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link to="/app/dashboard/calendar/Azure">Sign In</Link>
    <br></br>
    <br></br>
    <Link to="/app/calendar/Azure">Azure Calendar</Link>
    <br></br>
    <br></br>
    <Link to="/app/calendar/Metro">Metro Calendar</Link>
    <br></br>
  </Layout>
)

export default IndexPage

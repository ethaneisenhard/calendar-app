import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link to="/app/dashboard/calendar/Azure">Sign In</Link>
    <br></br>
    <br></br>
  </Layout>
)

export default IndexPage

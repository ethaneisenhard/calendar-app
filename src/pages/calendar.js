import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CalendarLayout from "../components/calendarLayout"

const Calendar = () => (
  <Layout>
    <SEO title="Home" />
    <CalendarLayout/>
  </Layout>
)

export default Calendar
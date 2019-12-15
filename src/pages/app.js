import React from 'react'
import { Router } from "@reach/router"
import Layout from "../components/layout"
import UpdateEventForm from "../components/updateEventForm"
import Test from "../components/test"

const Default = ()  => (
    <div>Hi</div>
);

const App = () => {
  return (
    <Layout>
      <Router>
        <UpdateEventForm path="/app/updateEvent/:eventID" />
        <Default path="/app" />
        <Test path="/app/test" />
      </Router>
    </Layout>
  )
}
export default App
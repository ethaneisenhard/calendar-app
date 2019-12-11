import React from "react"
import { graphql } from "gatsby"
import useForm from "react-hook-form"
import useGlobal from "../store/eventData"
import Layout from "../components/layout"
import SEO from "../components/seo"

const UpdateEventTemplate = ({ data }) => {

  const { register, handleSubmit, errors } = useForm()
  const [globalState, globalActions] = useGlobal()

  // var localEventData = globalActions.getEvent("eventData")
  // var eventObj = JSON.parse(localEventData)

  const updateEvent = data => {
    const stringData = JSON.stringify(data)
    globalActions.setEvent(stringData)
    console.log("updateEvent")
  }

  return (
    <Layout>
      <SEO title="Update Event Template" />
      {data.allRestApiEthaneisenhardCalendarappdbEvents.nodes.map(({ title, location }) => (
          <div>
            <form id="updateEvent" onSubmit={handleSubmit(updateEvent)}>
              <label>Title</label>
              <input
                name="title"
                defaultValue={title}
                ref={register}
              />
              <label>Location</label>
              <input
                name="location"
                ref={register}
                defaultValue={location}
              />
              {errors.exampleRequired && <p>This field is required</p>}
              <input type="submit" />
            </form>
          </div>
        )
      )}
      <h3>Data Response</h3>
      <pre>{globalState.eventData}</pre>
    </Layout>
  )
}

export default UpdateEventTemplate

export const query = graphql`
  query {
    allRestApiEthaneisenhardCalendarappdbEvents {
      nodes {
        title
        startDate
        location
        endDate
        description
        id
        fields {
          slug
        }
      }
    }
  }
`

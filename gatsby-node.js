const path = require(`path`)

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === `RestApiEthaneisenhardCalendarappdbEvents`) {
    const title = `/${node.eventDetails.title
      .replace(/ /g, "-")
      .replace(/[,&]/g, "")
      .toLowerCase()}/`

    const { createNodeField } = actions

    createNodeField({
      node,
      name: "slug",
      value: `/updateEvent${title}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allRestApiEthaneisenhardCalendarappdbEvents {
        nodes {
          eventDetails {
            id
            location
            startDate
            title
            endDate
            description
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const updateEventTemplate = path.resolve(
    `./src/templates/updateEventTemplate.js`
  )

  result.data.allRestApiEthaneisenhardCalendarappdbEvents.nodes.forEach(
    ({ fields }) => {
      createPage({
        path: fields.slug,
        component: updateEventTemplate,
        context: {
          slug: fields.slug, 
        },
      })
    }
  )
}

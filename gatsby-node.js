const path = require(`path`)

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === `RestApiEthaneisenhardCalendarappdbEvents`) {
    const title = `/${node.title
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
          id
          location
          startDate
          title
          endDate
          description
          fields {
            slug
          }
        }
      }
    }
  `)

  console.log(JSON.stringify(result, null, 4))

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

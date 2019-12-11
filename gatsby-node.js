const path = require(`path`);

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === `RestApiEthaneisenhardCalendarappdbEvents`) {
    console.log("zooman")
    const title = `/${node.title
      .replace(/ /g, "-")
      .replace(/[,&]/g, "")
      .toLowerCase()}/`

    const { createNodeField } = actions

    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual event node
      node,
      // Generated value based on filepath with "blog" prefix. you
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: `/event${title}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions
  const result = await graphql(`
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
  `)
  console.log(JSON.stringify(result, null, 4))

  const updateEventTemplate = path.resolve(`./src/templates/updateEventTemplate.js`)

  result.data.allRestApiEthaneisenhardCalendarappdbEvents.nodes.forEach(({ fields }) => {
    console.log(fields.slug)
    createPage({
      path: fields.slug,
      component: updateEventTemplate,
    })
  })

}
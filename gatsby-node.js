const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [{ test: /tiny-slider-react/, use: loaders.null() }],
      },
    });
  }
}

exports.onCreatePage = async ({page, actions}) => {
  if (page.path.match(/^\/main\/article/)) {
    const { createPage } = actions
    page.matchPath = "/main/article/*"

    // Update the page.
    createPage(page)
  }
}

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const articleDetail = path.resolve('./src/templates/article-detail.js')
    const clubeOverview = path.resolve('./src/templates/club-overview.js')
    resolve(
      graphql(`
        {
          teamPage: allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: ASC}
            limit: 1000
            filter: {frontmatter: {tag: {eq: "team"}}}
          ) {
            nodes {
              id
              fields {
                slug
              }
              frontmatter {
                teamUrl
                tag
              }
            }
          }
          articles: allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: ASC}
            limit: 1000
            filter: {frontmatter: {teamUrl: {ne: null}}}
          ) {
            nodes {
              id
              fields {
                slug
              }
              frontmatter {
                teamUrl
                tag
              }
            }
          }
        }      
      `).then(result => {
        if (result.errors) {
          console.warn(result.errors)
          reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors)
          reject(result.errors)
          return
        }

        /**
         * Create blog posts pages
         * But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
         * `context` is available in the template as a prop and as a variable in GraphQL
         */
        const teamPages = result.data.teamPage.nodes;
        if (teamPages) {
          teamPages.forEach((teamPage) => {
            const context = { id: teamPage.id }
            const path = teamPage.fields.slug;
            const component = clubeOverview;
            createPage({ path, component, context })
          })
        }

        if (result.data.articles.nodes) {
          result.data.articles.nodes.forEach((article) => {
            const path = `${article.frontmatter.teamUrl}${article.fields.slug}`;
            const component = articleDetail;
            const context = { id: article.id, team: '/' + article.frontmatter.teamUrl + '/' }
            createPage({ path, component, context })
          })
        }
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  /**
   * Explicitly define the siteMetadata {} object
   * This way those will always be defined even if removed from gatsby-config.js
   * Also explicitly define the Markdown frontmatter
   * This way the "MarkdownRemark" queries will return `null`
   * even when no blog posts are stored inside "content/blog" instead of returning an error
   * */
  createTypes(`
    type SiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      facebook: String
      instagram: String
      telegram: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      tag: String
      title: String
      description: String
      date: Date @dateformat
      author: String
      teamName: String
      teamUrl: String
      championship: String
      featuredImage: File @fileByRelativePath
      featuredImageAlt: String
      featuredImageSm: File @fileByRelativePath
      advertisementUrl: String
      size: String
      cover: File @fileByRelativePath
      crest: File @fileByRelativePath
      icon: String
    }

    type Fields {
      slug: String
    }
  `)
}

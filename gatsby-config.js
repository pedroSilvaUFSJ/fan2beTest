const buildEnv = process.env.BUILD_ENV
const env = typeof buildEnv === 'string' || buildEnv instanceof String ? `.env.${buildEnv}` : `.env.${process.env.NODE_ENV}`
const siteUrl = `https://test.fan2.be/`

require("dotenv").config({
  path: env,
})
module.exports = {
  siteMetadata: {
    title: "Fan2be",
    author: {
      name: `Pedro Silva and David Candreva`,
      summary: `Web Developer`,
    },
    description: `A starter blog for Fan2be.`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    social: { twitter: `Fan2be` },
  },
  pathPrefix: "/gatsby",
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }`,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: {nodes: allPages} }) => {
          return allPages.map(page => {    
            return { ...page }
          })
        },
        serialize: ({ path }) => {
          return {
            url: path,
            priority: 0.7,
            changefreq: `daily`,
          };
        },
      },
    },
    "gatsby-plugin-fontawesome-css",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          { resolve: `gatsby-remark-images` },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`nl`],
        defaultLanguage: `nl`,
        generateDefaultLanguagePage: true,
        i18nextOptions: {
          interpolation: {
            escapeValue: false
          },
          keySeparator: ".",
          nsSeparator: ":"
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-E3ZQVN8LPN",
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-K63HCRQ",
  
        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,
  
        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        
        // Defaults to gatsby-route-change
        //routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",

        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#FFF`,
        display: `minimal-ui`,
        icon: `src/images/favicon.jpg`,
      },
    }
  ],
};

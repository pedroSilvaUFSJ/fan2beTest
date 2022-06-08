import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, article, lang }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const {
    defaultTitle,
    defaultDescription,
    siteUrl
  } = site.siteMetadata

  let fullSiteTitle = defaultTitle + (!!title ? ` - ${title}` : '')
  const seo = {
    title: title || defaultTitle,
    language: lang || 'nl',
    description: description || defaultDescription,
    image: image && `${image}`,
    url: `${siteUrl}${pathname}`,
  }
  return (
    <Helmet title={seo.title} htmlAttributes={{lang: seo.language}}>
      <meta name="image" content={seo.image} />
      <meta name="facebook-domain-verification" content="f5hkyoyd6iyuxwdize1mf2gdb2ms5g" />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {!!description && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.image && <meta property="og:image" content={seo.image} />}
    </Helmet>
  )
}

export default SEO
SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}
SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

export const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl
      }
    }
  }
`
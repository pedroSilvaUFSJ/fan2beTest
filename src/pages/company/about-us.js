import React, { useEffect, useState } from 'react'
import Layout from '../../templates/layout'
import axios from 'axios'
import * as aboutUsStyles from './about-us.module.scss'
import { useI18next } from 'gatsby-plugin-react-i18next';
import { useTranslation } from "react-i18next"
import { urlGgeneratedByLanguage } from '../../utils/utils'
import { graphql } from 'gatsby'
import SEO from '../../components/core-module/organisms/seo/seo';


const RootAboutUs = () => {
    const translation = useTranslation()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { language } = useI18next()

    useEffect(() => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/pages?_format=json&nid=97`)
            .then((response) => {
                setTitle(response.data[0].title)
                setContent(response.data[0].body)
            })
    }, [language])


    return (
        <Layout >
          <SEO title={translation.t('sitename') +' - ' +translation.t('aboutus.title')} description={translation.t('aboutus.metaDescription')} />
            <div className={`container ${aboutUsStyles.section}`}>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </Layout>
    )
}

export default RootAboutUs

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

import React, { useEffect, useState } from 'react'
import Layout from '../../templates/layout'
import axios from 'axios'
import * as jobsStyles from './jobs.module.scss'
import { useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from '../../utils/utils'
import { graphql } from 'gatsby'
import SEO from '../../components/core-module/organisms/seo/seo';
import { useTranslation } from 'react-i18next';

const RootJobs = () => {
    const translations = useTranslation()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { language } = useI18next()

    useEffect(() => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/pages?_format=json&nid=103`)
            .then((response) => {
                setTitle(response.data[0].title)
                setContent(response.data[0].body)
            })
    }, [language])


    return (
        <Layout >
            <SEO title={translations.t('sitename') +' - '+ translations.t('jobs.title')} description={translations.t('jobs.metaDescription')} />
            <div className={`container ${jobsStyles.section}`}>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </Layout>
    )
}

export default RootJobs
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
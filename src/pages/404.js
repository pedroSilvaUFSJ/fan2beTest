import * as React from "react"
import * as style from './404.module.scss'
import Layout from "../templates/layout"
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import SEO from "../components/core-module/organisms/seo/seo";

const NotFoundPage = () => {
  const {language} = useI18next();
  const propLabels = {
    siteTitle: useTranslation().t('sitename'),
    pageTabTitleSupplement: useTranslation().t('errorpage.tabName'),
    pageTitle: useTranslation().t('errorpage.pageTitle'),
    pageSubtitle: {
      part1: useTranslation().t('errorpage.pageSubtitle.part1'),
      part2: useTranslation().t('errorpage.pageSubtitle.part2'),
    },
    returnHome: useTranslation().t('errorpage.returnButton')
  }

  return (
    <Layout >
      <SEO {...{lang: language, title: `${propLabels.siteTitle} - ${propLabels.pageTabTitleSupplement}` }}/>
      <div className={style.error_page}>
        <div className={style.content}>
          <h2 className={style.title}>{propLabels.pageTitle}</h2>
          <p className={style.text}>{propLabels.pageSubtitle.part1}<br />{propLabels.pageSubtitle.part2}</p>
          <div className={style.btn_container}>
            <a href="/">{propLabels.returnHome}</a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

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
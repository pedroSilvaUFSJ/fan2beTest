import React from 'react'

import * as RecoverStyles from './forgot-password.module.scss'

import Layout from '../../templates/layout'
import RecoverForm from '../../components/authentication-module/molecules/recover-form/recover-form'
import AuthenticationIntro from '../../components/authentication-module/atoms/authentication-intro/authentication-intro'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import SEO from '../../components/core-module/organisms/seo/seo'

const Recover = () => {
    const {language } = useI18next();
    const propLabels = {
        siteTitle: useTranslation().t('sitename'),
        pageTabTitleSupplement: useTranslation().t('forgotPassPage.pageTabTitleSupplement'),
        title: useTranslation().t('forgotPassPage.title'),
        text: useTranslation().t('forgotPassPage.text'),
    }
    return (
        <Layout >
            <SEO {...{lang: language, title: `${propLabels.siteTitle} - ${propLabels.pageTabTitleSupplement}` }}/>
            <div className={RecoverStyles.section}>
                <div className={'container '}>
                    <AuthenticationIntro title={propLabels.title} text={propLabels.text} />
                    <RecoverForm />
                </div>
            </div>
        </Layout>
    )
}

export default Recover

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
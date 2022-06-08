import React from 'react'

import * as registerStyles from './register.module.scss'

import RegisterForm from '../../components/authentication-module/molecules/register-form/register-form'
import AuthenticationIntro from '../../components/authentication-module/atoms/authentication-intro/authentication-intro'
import Layout from '../../templates/layout'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import SEO from '../../components/core-module/organisms/seo/seo'

const Register = () => {

    const {language } = useI18next();
    const propLabels = {
        siteTitle: useTranslation().t('sitename'),
        pageTabTitleSupplement: useTranslation().t('registerPage.pageTabTitleSupplement'),
        title: useTranslation().t('registerPage.title'),
        text: useTranslation().t('registerPage.text'),
    }

    return (
        <Layout >
          <SEO {...{lang: language, title: `${propLabels.siteTitle} - ${propLabels.pageTabTitleSupplement}` }}/>
            <div className={registerStyles.section}>
                <div className={'container '}>
                    <AuthenticationIntro title={propLabels.title} text={propLabels.text} />
                    <RegisterForm />
                </div>
            </div>
        </Layout>
    )
}

export default Register

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
import React, { useState } from 'react'

import * as LoginStyles from './login.module.scss'

import Layout from '../../templates/layout'
import LoginForm from '../../components/authentication-module/molecules/login-form/login-form'
import AuthenticationIntro from '../../components/authentication-module/atoms/authentication-intro/authentication-intro'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import RecoverForm from '../../components/authentication-module/molecules/recover-form/recover-form'
import SEO from '../../components/core-module/organisms/seo/seo'

const Login = () => {

  const [visibleFormTab, setVisibleFormTab] = useState(() => 1);
  const {language } = useI18next();
  const propLabels = {
    siteTitle: useTranslation().t('sitename'),
    pageTabTitleSupplement: useTranslation().t('loginPage.pageTabTitleSupplement'),
    title: useTranslation().t('loginPage.title'),
    text: useTranslation().t('loginPage.text'),
  }

  return (
    <Layout >
      <SEO {...{lang: language, title: `${propLabels.siteTitle} - ${propLabels.pageTabTitleSupplement}` }}/>
      <div className={LoginStyles.section}>
        <div className={'container '}>
          <AuthenticationIntro title={propLabels.title} text={propLabels.text} />
          {visibleFormTab === 3 && <RecoverForm setVisibleFormTab={setVisibleFormTab} />}
          {visibleFormTab === 1 && <LoginForm updateVisibleTab={setVisibleFormTab} />}
        </div>
      </div>
    </Layout>
  )
}

export default Login

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
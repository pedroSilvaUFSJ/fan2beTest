import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../templates/layout'
import * as style from './index.module.scss'

import Newsletter from '../components/main-page-module/molecules/newsletter-section/newsletter'
import YourChannel from '../components/main-page-module/molecules/your-channel/your-channel'
import LandingHomeSection from '../components/main-page-module/organisms/landing-home-section/landing-home-section';
import TopFiveSection from '../components/main-page-module/organisms/top-five-section/top-five-section';
import LeaguesSection from '../components/main-page-module/organisms/leagues-section/leagues-section'
import RandomPostsSection from '../components/main-page-module/organisms/random-posts-section/random-posts-section';
import { CookiesProvider, useCookies } from 'react-cookie';

import CookiesBanner from '../components/main-page-module/organisms/cookies-banner/cookies_banner'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import SEO from '../components/core-module/organisms/seo/seo'

const RootIndex = ({ location }) => {
  const [cookies] = useCookies(['user_consent']);
  const [, setCookiesBanner] = useState(true)
  const siteTitle = useTranslation().t('sitename')
  const siteDescription = useTranslation().t('sitename.description')
  const siteMetaDescription = useTranslation().t('sitename.metaDescription')
  const {language } = useI18next();

  useEffect(() => {
    checkCookies(cookies)
  }, [cookies])

  const checkCookies = (cookies) => {
    setCookiesBanner(Object.keys(cookies).length === 0 && cookies.constructor === Object)
  }

  return (
    <CookiesProvider>
      <Layout {...location}>
        <div className={style.content}>
        <SEO {...{lang: language, title: siteTitle+' - '+siteDescription, description: siteMetaDescription }}/>
          <div className="wrapper">
            <LandingHomeSection />
            <TopFiveSection />
            <RandomPostsSection />
            <LeaguesSection />
            <YourChannel />
            <Newsletter />
          </div>
        </div>
      </Layout>
      <CookiesBanner />
    </CookiesProvider>
  )
}

export default RootIndex

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

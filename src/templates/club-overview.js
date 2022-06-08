import React from 'react'
import Layout from './layout'

import * as clubOverviewStyles from './club-overview.module.scss'

import TopFiveSection from '../components/main-page-module/organisms/top-five-section/top-five-section'
import CarouselSection from '../components/main-page-module/organisms/carousel-section/carousel-section'
import ClubArticlesSection from '../components/main-page-module/organisms/club-articles-section/club-articles-section'
import YourChannel from '../components/main-page-module/molecules/your-channel/your-channel'
import Newsletter from '../components/main-page-module/molecules/newsletter-section/newsletter'
import TeamHeaderSection from '../components/main-page-module/organisms/team-header-section/team-header-section'
import { useI18next } from 'gatsby-plugin-react-i18next';
import SEO from '../components/core-module/organisms/seo/seo'

const {language } = useI18next();
const ClubOverviewTemplate = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO {...{lang: language, title: `${siteTitle} - ${clubeName} ` }}/>
      <div className={clubOverviewStyles.content}>
        <TeamHeaderSection {...teamHeaderProps} />
        <ClubArticlesSection />
        {!!postCarrousel?.length && <CarouselSection carousels={postCarrousel} />}
        {!!topFivePosts?.length && <TopFiveSection posts={topFivePosts} />}
        <YourChannel />
        <Newsletter />
      </div>
    </Layout>
  )
}

export default ClubOverviewTemplate

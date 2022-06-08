import React from 'react'
import Layout from './layout'

import * as articleDetailStyles from './article-detail.module.scss'

import TopFiveSection from '../components/main-page-module/organisms/top-five-section/top-five-section'
import MorePostsSection from '../components/main-page-module/organisms/more-posts-section/more-posts-section'
import CarouselSection from '../components/main-page-module/organisms/carousel-section/carousel-section'
import YourChannel from '../components/main-page-module/molecules/your-channel/your-channel'
import Newsletter from '../components/main-page-module/molecules/newsletter-section/newsletter'
import TeamHeaderSection from '../components/main-page-module/organisms/team-header-section/team-header-section'
import ArticleContent from '../components/main-page-module/organisms/article-content/article-content'
import ArticleFooter from '../components/main-page-module/organisms/article-footer/article-footer'

import { createPreviewArticleObject, createTopFiveArticleObject, getAdvertisement, createHeaderObj } from '../utils/utils'
import { useI18next } from 'gatsby-plugin-react-i18next';
import SEO from '../components/core-module/organisms/seo/seo'

const ArticleDetailTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title;
  const {language } = useI18next();

  const articleContentProps = {
    title: articleHeader.title,
    teamName: articleHeader.teamName,
    date: articleHeader.date,
    author: articleHeader.author,
    featuredImage: {
      img: articleHeader.featuredImage?.childImageSharp?.fluid,
      label: { icon: 'play' },
      alt: articleHeader.featuredImageAlt
    },
    advertisement: getAdvertisement(ads, 'lg'),
  }

  const articleFooterProps = {
    advertisement: getAdvertisement(ads, 'md'),
  }

  const teamHeaderProps = (data?.teamInfo) ? createHeaderObj(data?.teamInfo) : null

  return (
    <Layout location={location}>
      <SEO {...{lang: language, title: `${siteTitle} - ${articleHeader.title}` }}/>
      {teamHeaderProps && <TeamHeaderSection {...teamHeaderProps} />}
      <div className={articleDetailStyles.content}>
        <ArticleContent {...articleContentProps} >
          {article.html}
        </ArticleContent>
        <ArticleFooter {...articleFooterProps} />
        {!!morePosts && <MorePostsSection data={morePosts} />}
        {!!postCarrousel?.length && <CarouselSection carousels={postCarrousel} />}
        {!!topFivePosts?.length && <TopFiveSection posts={topFivePosts} />}
        <YourChannel />
        <Newsletter />
      </div>
    </Layout>
  )
}

export default ArticleDetailTemplate
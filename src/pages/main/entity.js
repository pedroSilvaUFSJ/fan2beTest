import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from '../../templates/layout'
import * as entityStyles from './entity.module.scss'
import { graphql, navigate } from 'gatsby'

import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from '../../utils/utils'

import TopFiveSection from '../../components/main-page-module/organisms/top-five-section/top-five-section'
import YourChannel from '../../components/main-page-module/molecules/your-channel/your-channel'
import Newsletter from '../../components/main-page-module/molecules/newsletter-section/newsletter'
import TeamHeaderSection from '../../components/main-page-module/organisms/team-header-section/team-header-section'
import ClubArticlesSection from '../../components/main-page-module/organisms/club-articles-section/club-articles-section'
import EntityRelated from '../../components/main-page-module/organisms/entity-related/entity-related'
import { loadAds, readAndGenerateTopAd, getMiddleTextAd, newLoadAdsCampaign } from '../../services/ads-service'
import SEO from '../../components/core-module/organisms/seo/seo'

const EntityPage = () => {
  const isBrowser = () => typeof window !== "undefined"
  const queryString = isBrowser() && window ? window.location.search : ''
  const urlParams = new URLSearchParams(queryString);
  const entityId = urlParams.get('id');
  const { language } = useI18next()
  const siteTitle = useTranslation().t('sitename')

  const [detail, setDetail] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState(null)
  const [adsSection, setAdsSection] = useState(null)

  const [entityDetails, setEntityDetails] = useState(null)
  const [entityType, setEntityType] = useState(null)

  useEffect(() => {
    axios.get(`${urlGgeneratedByLanguage(language)}/node/${entityId}?_format=json`).then((result) => {
      const nodeDetails = result.data;

      if (!nodeDetails) return
      if (nodeDetails.type[0].target_id !== 'club' && nodeDetails.type[0].target_id !== 'athlet_person' && nodeDetails.type[0].target_id !== 'league' && nodeDetails.type[0].target_id !== 'player' && nodeDetails.type[0].target_id !== 'sport') return

      setEntityType(nodeDetails.type[0].target_id)
      const type = nodeDetails.type[0].target_id === 'athlet_person' ? 'player' : nodeDetails.type[0].target_id;

      setRelatedArticles(null)
      axios.all([
        axios.get(`${urlGgeneratedByLanguage(language)}/api/${type}s?_format=json&id=${entityId}`), //entity detail
        axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&${type}=${entityId}`), // related articles
        loadAds(language, `club_id=${entityId}`, true), //ads
        // TODO: newLoadAdsCampaign(language, type === 'club' ? `clube_id=${entityId}` : type === 'sport' ? `sport_id=${entityId}` : `entity_id=${entityId}&entity_type=${type}s`, true)
      ]).then((responseDetails) => {
 
        setEntityDetails(responseDetails[0]?.data[0])

        const clubDetails = responseDetails[0]?.data[0]
        const clubRelatedArticles = responseDetails[1]?.data
        clubRelatedArticles['allowEgPower'] = !!parseInt(clubDetails.eg_power)
        const adsDetails = responseDetails[2]?.data

        const articleContentProps = {}
        const articleFooterProps = { moreDetails: [] }

        articleContentProps.title = clubDetails.name || clubDetails.title
        articleContentProps.date = clubDetails.created
        articleContentProps.children = clubDetails.description
        articleContentProps.subtitle = clubDetails.subtitle
        articleContentProps.isEgPower = clubRelatedArticles['allowEgPower']

        articleContentProps.featuredImage = {
          img: `${clubDetails.media_link}`,
          alt: clubDetails.name,
          label: { icon: 'play' },
          banner: clubDetails ? `${clubDetails.banner}` : "",
          logo: clubDetails ? `${clubDetails.logo}` : null
        };

        articleContentProps.trooper = {
          url: clubDetails?.trooper_link,
          isEnabled: clubDetails?.trooper_select
        };

        articleContentProps.cover = clubDetails ? `${clubDetails.banner}` : ""
        articleContentProps.coverAltText = clubDetails?.banner_alt_text || 'cover image'
        articleContentProps.crest = clubDetails ? `${clubDetails.logo}` : null
        articleContentProps.teamUrl = clubDetails ? `/main/entity?id=${entityId}` : null
        articleContentProps.teamName = clubDetails ? clubDetails.title : null
        articleContentProps.id = entityId;
        articleContentProps.type = type;

        articleFooterProps.moreDetails.push(
          { description: articleContentProps.teamName, to: `main/entity?id=${entityId}` },
        )

        setRelatedArticles(clubRelatedArticles);
        setDetail(articleContentProps);
        readAndGenerateTopAd(adsDetails)
        setAdsSection(getMiddleTextAd(adsDetails))

      });
    })
      .catch(function (error) {
        if (error.response.status === 404) { navigate("/404.html", { replace: true }) }
      })
  }, [entityId, language])

  return (
    <Layout >
      {!!detail && <SEO {...{lang: language, title: `${siteTitle} - ${detail.teamName}` }}/>}
      <div className={entityStyles.section}>
        <TeamHeaderSection {...detail} />
        {!!relatedArticles && <ClubArticlesSection advertisement={adsSection} posts={relatedArticles} entityId={entityId}/>}
        {entityDetails && <EntityRelated entityType={entityType} entityDetails={entityDetails} />}
        <TopFiveSection />
        <YourChannel />
        <Newsletter />
      </div>
    </Layout>
  )
}

export default EntityPage

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


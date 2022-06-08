
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { graphql } from 'gatsby'
import { convertHtmlEntity } from '../../utils/utils'

import Layout from '../../templates/layout'
import * as articleStyles from './article.module.scss'

import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from '../../utils/utils'

import TopFiveSection from '../../components/main-page-module/organisms/top-five-section/top-five-section'
import MorePostsSection from '../../components/main-page-module/organisms/more-posts-section/more-posts-section'
import YourChannel from '../../components/main-page-module/molecules/your-channel/your-channel'
import Newsletter from '../../components/main-page-module/molecules/newsletter-section/newsletter'
import TeamHeaderSection from '../../components/main-page-module/organisms/team-header-section/team-header-section'
import ArticleContent from '../../components/main-page-module/organisms/article-content/article-content'
import ArticleFooter from '../../components/main-page-module/organisms/article-footer/article-footer'

import { convertStringToObject } from '../../utils/string-to-object'
import ArticleRelated from '../../components/main-page-module/organisms/article-related/article-related'
import SEO from '../../components/core-module/organisms/seo/seo'


const ArticlePage = () => {
    const isBrowser = () => typeof window !== "undefined"
    const queryString = isBrowser() && window ? window.location.search : ''
    const urlParams = new URLSearchParams(queryString);
    const articleId = urlParams.get('id');
    const { language } = useI18next()
    const siteTitle = useTranslation().t('sitename')

    const [detail, setDetail] = useState(null)
    const [relatedArticles, setRelatedArticles] = useState(null)
    const [footerArticles, setFooterArticles] = useState(null)


    useEffect(() => {
        axios.all([
            axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&id=${articleId}`), //article detail
        ]).then((responseDetails) => {
            let articleDetails = responseDetails[0]?.data[0];

            if (!articleDetails) return
            if (articleDetails.entity_type !== 'articles') return

            const relatedToClub = convertStringToObject(articleDetails?.clubs)[0]
            const relatedToLeague = convertStringToObject(articleDetails?.leagues)[0]
            const relatedToPlayer = convertStringToObject(articleDetails?.players)[0]
            const relatedToSport = convertStringToObject(articleDetails?.sports)[0]


            axios.all([
                relatedToClub?.id ? axios.get(`${urlGgeneratedByLanguage(language)}/api/clubs?_format=json&id=${relatedToClub?.id}`) : null, //article detail
                relatedToClub?.id ? axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&club=${relatedToClub?.id}`) : null,
                relatedToLeague?.id ? axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&league=${relatedToLeague?.id}`) : null,
                relatedToPlayer?.id ? axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&player=${relatedToPlayer?.id}`) : null,
                relatedToSport?.id ? axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&sport=${relatedToSport?.id}`) : null

            ]).then((response) => {
                let clubDetails = response[0]?.data[0];
                let clubRelatedArticles = response[1]?.data;
                // let leagueRelatedArcticles = response[2]?.data;
                let playerRelatedArcticles = response[3]?.data;
                // let sportRelatedArcticles = response[4]?.data;

                const articleContentProps = {}
                const articleFooterProps = {}
                const morePosts = {};
                const postCarrousel = [];

                articleContentProps.title = convertHtmlEntity(articleDetails.title || articleDetails.name)
                articleContentProps.date = articleDetails.created
                articleContentProps.children = convertHtmlEntity(articleDetails.description)
                articleContentProps.subtitle = convertHtmlEntity(articleDetails.subtitle)

                articleContentProps.featuredImage = {
                    img: `${articleDetails.media_link}`,
                    alt: articleDetails.title || articleDetails.name,
                    label: { icon: 'play' },
                    banner: clubDetails ? `${clubDetails.banner}` : "",
                    logo: clubDetails ? `${clubDetails.logo}` : null
                };

                articleContentProps.cover = clubDetails ? `${clubDetails.banner}` : "";
                articleContentProps.coverAltText = clubDetails?.banner_alt_text || 'cover image'

                articleContentProps.crest = clubDetails ? `${clubDetails.logo}` : null;
                articleContentProps.logo_alt_text = clubDetails ? `${clubDetails.logo_alt_text}` : "entity profile";
                articleContentProps.teamUrl = clubDetails ? `/main/entity?id=${relatedToClub?.id}` : null;
                articleContentProps.author = articleDetails.authorised_by
                articleContentProps.teamName = clubDetails ? clubDetails.title : null;
                articleContentProps.isVideo = articleDetails?.media_type === 'image' ? false : true
                articleContentProps.mediaUrl = articleDetails?.media_link || ''
                articleContentProps.videoType = articleDetails?.media_type
                articleContentProps.entityId = !!articleDetails.sport && articleDetails.sport.split('$')[0];

                morePosts.title = `Meer over ${articleContentProps.teamName}`;
                morePosts.to = `main/entity?id=${relatedToClub?.id}`;
                morePosts.linkText = `Alles over ${articleContentProps.teamName}`;
                morePosts.articles = (clubRelatedArticles || []).slice(0, 3);
                articleContentProps.id = articleId;

                articleFooterProps.id = articleId
                articleFooterProps.moreDetails = []

                if (relatedToClub?.id) {
                    articleFooterProps.moreDetails.push(
                        relatedToClub?.id ? { description: articleContentProps.teamName, to: `main/entity?id=${relatedToClub?.id}` } : null,
                    )
                }

                // TODO mocked info for carousel
                postCarrousel.push(
                    relatedToPlayer?.id ? { title: 'Meer Australian Open', linkText: 'Alles over voetbal', to: 'Voetbal', articles: playerRelatedArcticles } : null,
                )

                setDetail(articleContentProps);
                setFooterArticles(articleFooterProps);
                setRelatedArticles(morePosts);
            });
        });
    }, [articleId, language])

    return (
        <Layout >
            {!!detail && <SEO {...{lang: language, title: `${siteTitle} - ${detail.title}` }}/>}
            <TeamHeaderSection {...detail} />
            <div className={articleStyles.section}>
                {!!detail && <ArticleContent article={detail} />}
                {!!footerArticles && <ArticleFooter article={footerArticles} />}
                {!!relatedArticles && !!footerArticles.moreDetails.length && <MorePostsSection data={relatedArticles} />}
                {detail && <ArticleRelated articleId={articleId} />}
                <TopFiveSection />
            </div>
            <YourChannel />
            <Newsletter />
        </Layout>
    )
}

export default ArticlePage

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

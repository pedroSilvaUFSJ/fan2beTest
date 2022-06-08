import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { graphql, Link } from 'gatsby'

import * as searchStyles from './search.module.scss'
import Layout from '../../templates/layout'
import ArticlePreview from '../../components/main-page-module/molecules/article-preview/article-preview'
import FirstLikesItem from '../../components/authentication-module/molecules/first-likes-item/first-likes-item'
import { urlGgeneratedByLanguage } from '../../utils/utils'
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import SEO from '../../components/core-module/organisms/seo/seo'

const Search = () => {
    const isBrowser = () => typeof window !== "undefined"
    const queryString = isBrowser() && window ? window.location.search : ''
    const urlParams = new URLSearchParams(queryString);
    const [searchTag, setSearchTag] = useState(urlParams.get('tag'))
    if (urlParams.get('tag') !== searchTag) { setSearchTag(urlParams.get('tag')) }

    const propLabels = {
        siteTitle: useTranslation().t('sitename'),
        pageTabTitleSupplement: useTranslation().t('searchpage.tabName'),
        title: useTranslation().t('searchpage.maintitle'),
        titleProfiles: useTranslation().t('searchpage.profiles'),
        titleArticles: useTranslation().t('searchpage.articles'),
    }

    const [searchResultsArticles, setSearchResultsArticles] = useState([])
    const [searchResultsEntities, setSearchResultsEntities] = useState([])
    const { language } = useI18next()

    useEffect(() => {
        const isBrowser = () => typeof window !== "undefined"
        const csrf_token = isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        const header = { 'X-CSRF-Token': csrf_token }
        axios.get(`${urlGgeneratedByLanguage(language)}/api/search?club_search=${searchTag}&league_search=${searchTag}&player_search=${searchTag}&sport_search=${searchTag}&article_search=${searchTag}`, { headers: header })
            .then((response) => {
                const articles = response.data.filter(item => item.entity_type === 'articles')
                const entities = response.data.filter(item => item.entity_type !== 'articles').map((article, index) => {
                    const mediaUrl = article.logo
                    return { mediaUrl, ...article }
                })
                setSearchResultsEntities(entities)
                setSearchResultsArticles(articles)
            })
    }, [searchTag, language])

    return (
        <Layout >
            <SEO {...{lang: language, title: `${propLabels.siteTitle} - ${propLabels.pageTabTitleSupplement}` }}/>
            <div className={`container ${searchStyles.section}`}>
                <div className={`${searchStyles.header}`}>
                    <h1>{propLabels.title}:</h1>
                    <span>{searchTag}</span>
                </div>
                <div className={searchStyles.results}>
                    <h2>{propLabels.titleProfiles}</h2>
                    <div className={searchStyles.entities}>
                        {
                            searchResultsEntities?.map((entity, index) => (
                                <div key={`mainPost_${index}`} className={searchStyles.entity}>
                                    <Link to={`/main/entity?id=${entity.id}`}>
                                        <FirstLikesItem imgurl={`${entity.logo}`} name={entity.title} interestId={entity.id} showLike={false} />
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <h2>{propLabels.titleArticles}</h2>
                    <div className={searchStyles.articles}>
                        {
                            searchResultsArticles?.map((article, index) => (
                                <div key={`mainPost_${index}`} className={searchStyles.article}>
                                    <ArticlePreview article={article} horizontal={true} showSubtitle={false} hideTags={false} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search

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
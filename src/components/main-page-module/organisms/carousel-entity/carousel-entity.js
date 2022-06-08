import React, { useEffect, useState } from 'react'
import axios from 'axios'

import * as styles from './carousel-entity.module.scss'
import { useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"
import CarouselSection from '../carousel-section/carousel-section';
import ArticlePreview from '../../molecules/article-preview/article-preview';

/**
 * 
 * @param { articleId, entity, entityType }
 * @returns a component rendering a carousel group for a given entity type according to entity.id 
 * if there is an articleId it will exclude that article from the list.
 */
const CarouselEntity = ({ articleId, entity, entityType }) => {
    const { language } = useI18next()
    const [carousel, setCarousel] = useState(null)

    useEffect(() => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&${entityType}=${entity.id}`).then(res => {
            let articles = res.data
            if (articleId) { articles = res.data?.filter(article => articleId && articleId !== article.id) }

            const carouselArticles = articles.map((article, index) => (
                <div key={`entity_article_${index}`} className={'slider__item'}>
                    <ArticlePreview article={article} horizontal={false} hideTags={true} />
                </div>
            ))
            setCarousel({ title: entity.title, articles: carouselArticles, linkTo: `/main/entity?id=${entity.id}` })
        })
    }, [language])

    return (
        <div className={`${styles.content}`}>
            {carousel && carousel.articles?.length > 0 && <CarouselSection {...carousel} />}
        </div>
    )
}

export default CarouselEntity

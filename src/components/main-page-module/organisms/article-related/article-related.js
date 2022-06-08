import React, { useEffect, useState } from 'react'
import CarouselEntity from '../carousel-entity/carousel-entity'
import * as styles from './article-related.module.scss'
import axios from 'axios'
import { useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from '../../../../utils/utils';
import { convertStringToObject } from '../../../../utils/string-to-object';

const ArticleRelated = ({ articleId }) => {
    const { language } = useI18next()
    const [relatedSport, setRelatedSport] = useState('')
    const [relatedLeague, setRelatedLeague] = useState('')
    const [relatedClub, setRelatedClub] = useState('')
    const [relatedPlayer, setRelatedPlayer] = useState('')

    useEffect(() => {
        if (articleId) {
            axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&id=${articleId}`).then(res => {
                setRelatedClub(convertStringToObject(res.data[0]?.sports)[0])
                setRelatedLeague(convertStringToObject(res.data[0]?.leagues)[0])
                setRelatedSport(convertStringToObject(res.data[0]?.clubs)[0])
                setRelatedPlayer(convertStringToObject(res.data[0]?.players)[0])
            })
        }
    }, [language])

    return (
        <div className={`container ${styles.content}`}>
            <div className={styles.related}>
                {relatedLeague && <CarouselEntity articleId={articleId} entity={{ id: relatedLeague.id, title: relatedLeague.name }} entityType={'league'} ></CarouselEntity>}
            </div>
            <div className={styles.related}>
                {relatedSport && <CarouselEntity articleId={articleId} entity={{ id: relatedSport.id, title: relatedSport.name }} entityType={'sport'} ></CarouselEntity>}
            </div>
            <div className={styles.related}>
                {relatedClub && <CarouselEntity articleId={articleId} entity={{ id: relatedClub.id, title: relatedClub.name }} entityType={'club'} ></CarouselEntity>}
            </div>
            <div className={styles.related}>
                {relatedPlayer && <CarouselEntity articleId={articleId} entity={{ id: relatedPlayer.id, title: relatedPlayer.name }} entityType={'player'} ></CarouselEntity>}
            </div>
        </div>
    )
}

export default ArticleRelated

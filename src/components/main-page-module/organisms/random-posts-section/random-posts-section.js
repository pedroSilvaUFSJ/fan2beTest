import React, { useEffect, useState } from "react"
import axios from 'axios'

import * as styles from './random-posts-section.module.scss'
import ArticlePreview from "../../molecules/article-preview/article-preview"
import Advertisement, {classOptions} from "../../../advertisments-module/atoms/advertisement/advertisement"
import { urlGgeneratedByLanguage } from "../../../../utils/utils"
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { readAndGenerateTopAd } from "../../../../services/ads-service"
import { loadAds } from "../../../../services/ads-service"
import Emitter from "../../../../services/emitter"


const RandomPostsSection = () => {

    const [firstRow, setFirstRow] = useState([])
    const [otherPosts, setOtherPosts] = useState([])
    const { language } = useI18next()
    const [advertisement, setAdvertisement] = useState('')
    const [limit, setLimit] =  useState([])
  
    const propLabels = {
        loadMore: useTranslation().t('articles.more')
    }

    useEffect(() => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&home=1`).then(res => {
            const sectionThree = res.data.slice(5)
            const firstRowTemp = sectionThree.slice(0, 3).map((article, index) => {
                const size = (index === 0) ? 'lg' : 'md';
                return { size, ...article }
            })
            
            const otherPostsTemp = sectionThree.slice(3)
            setLimit(otherPostsTemp.length > 4 ? 4 : otherPostsTemp.length)
            setFirstRow(firstRowTemp)
            setOtherPosts(otherPostsTemp)
        })
    }, [])

    //advertisments
    useEffect(() => {
        loadAds(language, 'home=1&entity_type=home').then(res => {
           // readAndGenerateTopAd(res.data)
            setAdvertisement(res.data.filter(add => add.position === "2")[0])
        })
    }, [language])


    useEffect(() => {
        Emitter.on('ADS_RANDOM_EVENT', function(result){
            setAdvertisement(result)
        })
    }, [Emitter])

    
    const loadMoreHandler = () => {
        var loadItens = limit + 9
        setLimit(loadItens);
    }

    return (
        <div className={styles.content}>
            <div className="container">
                <div className={styles.firstRow}>
                    {
                        firstRow.map((article, index) => (
                            <div key={`randonPost_vertical${index}`} className={styles.firstRow__item}>
                                <ArticlePreview article={article} horizontal={false} />
                            </div>
                        ))
                    }
                </div>
                <div className={styles.secondRow}>
                    <div className={styles.secondRow__posts}>
                        {
                            otherPosts.slice(0, limit).map((article, index) => (
                                <div key={`randonPost_horizontal${index}`} className={styles.secondRow__posts__item}>
                                    <ArticlePreview article={article} horizontal={true} />
                                </div>
                            ))
                        }
                        <div className={styles.loadMore}>
                            {(limit < otherPosts.length) && <button className={`${styles.loadMore__button}`} onClick={() => loadMoreHandler()}>{propLabels.loadMore}</button>}
                        </div>
                    </div>
                    <div className={styles.secondRow__advertisement}>
                        {advertisement && <Advertisement mediaUrl={advertisement.media_link}
                            addUUID={`${advertisement.id}-landing-${advertisement.position}`}
                            destinationLink={advertisement.url}
                            mediaType={advertisement.media_type}
                            campaignId={advertisement.campaignId} 
                            classOption={classOptions.advertisementRandom}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RandomPostsSection

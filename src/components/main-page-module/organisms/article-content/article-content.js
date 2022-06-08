import React, { useEffect, useState } from 'react'
import { useI18next } from 'gatsby-plugin-react-i18next';
import Emitter from '../../../../services/emitter'
// import SocialNetwork from '../../atoms/social-network/social-network'

import * as styles from './article-content.module.scss'
import profileIcon from '../../../../images/profile.svg'
import stopwatch from '../../../../images/stopwatch.svg'
import Video from '../../atoms/video-media/video-media';
import Advertisement, {classOptions} from "../../../advertisments-module/atoms/advertisement/advertisement"
import { convertHtmlEntity } from '../../../../utils/utils'
import { loadAds } from '../../../../services/ads-service';
import { AdsRequestAdapter } from '../../../advertisments-module/atoms/advertisement/advertisement';
import ExtraAd from '../../../advertisments-module/organisms/extra-ad/extra-ad';


const ArticleContent = ({ article, title, teamName, date, author, advertisement, featuredImage }) => {
    title = convertHtmlEntity(article?.title)
    teamName = convertHtmlEntity(article?.teamName)
    const subtitle = convertHtmlEntity(article?.subtitle)
    const description = article?.children //.split('\n').map(str => <p>{convertHtmlEntity(str)}</p>)
    const type = article?.videoType
    const { language } = useI18next()
    date = article?.date
    author = article?.author
    featuredImage = article?.featuredImage

    const [adSide, setAdSide] = useState({});
    const [adMiddleText, setAdMiddleText] = useState({});
    const [adEndText, setAdEndText] = useState({});

    useEffect(() => {
        loadAd(language, article.id)   
    }, [language, article])

    useEffect(() => {
        Emitter.on('ADS_RANDOM_EVENT', function (result) {
          setAdSide(AdsRequestAdapter(result))
        })
    }, [Emitter])

    const filterAds = (ads) => {

            // ads = ads.slice(1, ads.length);
            for(const ad of ads) {
                if(ad.position === '1') {
                    setAdMiddleText(AdsRequestAdapter(ad))
                }

                if(ad.position === '0') {
                    Emitter.emit('TOP_AD_EVENT', AdsRequestAdapter(ad))
                }

                if(ad.position === '2') {
                    setAdSide(AdsRequestAdapter(ad))
                }

                // if(ad.position === '2') {
                //     setAdEndText(AdsRequestAdapter(ad))
                // }
            }
    }

    const loadAd = (language, articleId) => {
        loadAds(language, `entity_id=${articleId}&entity_type=articles`).then(function(response) {
            filterAds(response.data);
        })
    }


    return (
        <div className={`container ${styles.content}`} >
            <div className={styles.header}>
                <div className={styles.header__social}></div>
                <div className={styles.header__title}>
                    <h1>{title}</h1>
                    <div className={styles.header__title__subtitle}>
                        <p>{teamName}</p>
                        <div className={styles.header__title__subtitle__item}>
                            <img className={styles.header__title__subtitle__date__icon} alt='stopwatch' src={stopwatch} />
                            <p>{date}</p>
                        </div>
                        <div className={styles.header__title__subtitle__item}>
                            <img className={styles.header__title__subtitle__profile} alt='profile icon' style={{ width: '16px' }} src={profileIcon} />
                            <p>{author}</p>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>


            <div className={styles.body}>
                <div className={styles.landing}>
                    <div className={styles.landing__socialNetwork}>
                        { /* <SocialNetwork /> */}
                    </div>
                    <div className={styles.landing__content}>
                        <div className={styles.info}>
                            <div className={styles.image}>
                                {!article.isVideo && <img src={featuredImage?.img} alt={featuredImage?.alt} />}
                                {article.isVideo && <Video type={type} source={featuredImage?.img} showControls={true} playable={true} />}
                            </div>
                            {!!featuredImage?.alt && <div className={styles.imageAlt} dangerouslySetInnerHTML={{ __html: featuredImage?.alt }}></div>}
                            {/*before*/}
                            <strong>
                                <div id='articleSubtitle' className={`${styles.htmlContent}`} dangerouslySetInnerHTML={{ __html: subtitle }} >
                                </div>
                            </strong>
                            <div className={styles.middleAdvertisement}>
                                <Advertisement {...adMiddleText} classOption={classOptions.advertisementMiddleText}/>
                            </div>
                            {/*after*/}
                            <div id='articleContent' className={`${styles.htmlContent}`} dangerouslySetInnerHTML={{ __html: description }} >

                            </div>
                            <div className={styles.bottomAdvertisement}>
                                <Advertisement {...adEndText} classOption={classOptions.advertisementEndText}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.landing__advertisement}>
                        <ExtraAd />
                        <div>
                            <Advertisement {...adSide} classOption={classOptions.advertisementASide}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleContent

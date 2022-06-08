import React, { useEffect, useState } from "react"
import axios from 'axios'

import * as landingSectionStyles from './landing-home-section.module.scss'
import ArticlePreview from "../../molecules/article-preview/article-preview"
import Advertisement,{classOptions} from "../../../advertisments-module/atoms/advertisement/advertisement"
import { useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"
import { loadAds, readAndGenerateTopAd, getHomeMiddleTextAd} from "../../../../services/ads-service"
import ExtraAd from "../../../advertisments-module/organisms/extra-ad/extra-ad"
import Emitter from "../../../../services/emitter"

const LandingHomeSection = () => {

    const [mainPosts, setMainPosts] = useState([])
    const [rightPosts, setRightPosts] = useState([])
    const { language } = useI18next()
    const [midAdvertisement, setMidAdvertisement] = useState('')

    //content
    useEffect(() => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/view/articles?_format=json&home=1`).then(res => {
            const sectionOne = res.data.slice(0, 6)
            const mainPosts = sectionOne.slice(0, 5).map((article, index) => {
                const size = (index === 0) ? 'lg' : 'md';
                return { size, ...article }
            })
            const rightPosts = sectionOne.slice(5, 6)
            setMainPosts(mainPosts)
            setRightPosts(rightPosts)
        })
    }, [language])


    
    useEffect(() => {
       Emitter.on('MIDDLE_AD_EVENT', function(result){
            setMidAdvertisement(result)
       })

    }, [Emitter])
    

    //advertisments
    useEffect(() => {
        loadAds(language, 'home=1').then(res => {
            readAndGenerateTopAd(res.data)
            setMidAdvertisement(getHomeMiddleTextAd(res.data))
        })

    }, [language])



    return <>

        <div className={`container ${landingSectionStyles.content}`}>
            <div className={`${landingSectionStyles.firstColumn} `}>
                {
                    mainPosts?.map((article, index) => (
                        <div key={`mainPost_${index}`} className={landingSectionStyles.firstColumn__postItem}>
                            <ArticlePreview article={article} horizontal={index !== 0} />
                        </div>
                    ))
                }
            </div>
            {/* <Advertisement mediaUrl={}/> */}

            <div className={landingSectionStyles.secondColumn}>
                <ExtraAd />
                <div className={landingSectionStyles.secondColumn__advertisement}>
                    {midAdvertisement.campaignId && <Advertisement campaignId={midAdvertisement.campaignId}  mediaUrl={midAdvertisement.media_link}
                        addUUID={`${midAdvertisement.id}-landing-${midAdvertisement.position}`}
                        destinationLink={midAdvertisement.url}
                        mediaType={midAdvertisement.media_type} 
                        classOption={classOptions.advertisementMid}/>}
                </div>
                {
                    rightPosts?.map((article, index) => (
                        <div key={`mainPost_${index}`} className={landingSectionStyles.firstColumn__postItem}>
                            <ArticlePreview article={article} horizontal={index !== 0} />
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}

export default LandingHomeSection

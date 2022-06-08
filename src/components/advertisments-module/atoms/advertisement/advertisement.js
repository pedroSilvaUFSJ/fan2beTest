
import React,{ useEffect, useState, useRef } from 'react'
import axios from 'axios'
import * as advertisementStyles from './advertisement.module.scss'
import Video from '../../../main-page-module/atoms/video-media/video-media'
import { urlGgeneratedByLanguage } from '../../../../utils/utils'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { loadAds, readAndGenerateTopAd, getHomeMiddleTextAd } from '../../../../services/ads-service'
import Emitter from '../../../../services/emitter'


export const AdsRequestAdapter = (requestData) => ({
        mediaUrl: requestData?.media_link,
        mediaType: requestData?.media_type,
        addUUID: requestData?.club_id || requestData?.id || requestData?.advertisement_id,
        destinationLink: requestData?.url,
        altDescription: requestData?.alternative_text,
        title: requestData?.title,
        position: requestData?.position,
        campaignId: requestData?.campaignId
})

export const classOptions = {
    advertisement: 'advertisement',
    advertisementTop: 'advertisementTop',
    advertisementFooter: 'advertisementFooter',
    advertisementSide: 'advertisementSide',
    advertisementASide: 'advertisementASide',
    advertisementMiddleText: 'advertisementMiddleText',
    advertisementEndText: 'advertisementEndText',
    advertisementClubArticle: 'advertisementClubArticle',
    advertisementMid: 'advertisementMid',
    advertisementRandom: 'advertisementRandom'
}

/**
 * Loads a single Advertisement
 * @param {mediaUrl, addUUID, destinationLink, mediaType} 
 * media link, could be an image link or video link
 * id to be target in google tracking must be unique to add and component
 * destination link external link to the add provider 
 * specification of the type of the media
 * @returns 
 * A component rendering a single piece of advertisement. 
 * Sizing must be done on parent component for reusability
 * React css does not need to be passed as props you can style this component from outside
 */


 let adsList = {
    advertisementTop: 0,
    advertisementMid: 0,
    advertisementRandom: 0,
    advertisementASide: 0
}


let previousRef = []

const Advertisement = ({ mediaUrl, campaignId, addUUID, destinationLink, mediaType, classOption, altDescription, target, title }) => {
    const targetAction = !target ? '__blank' : target;
    const componentClass = !classOptions.hasOwnProperty(classOption) ? advertisementStyles.advertisement : advertisementStyles[classOption]    
    const isBrowser = () => typeof window !== "undefined"    
    const userId = isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenId"))
    const queryString = isBrowser() && window ? window.location.search : ''
    const urlParams = new URLSearchParams(queryString);
    const entityId = urlParams.get('id');
    const ref = useRef(null)
    const [lastRef, setLastRef] = useState(null)

    const { language } = useI18next()
    
    const sendRequest = (id, campaignId, type) => {
        axios.defaults.withCredentials = false
        const header = { 'Content-Type': 'application/json' }

        const request =  {
            "advertisment_id": id,
            "campaign_id" : parseInt(campaignId),
            "user_id": userId || 0,
            "entity_type": "article",
            "entity_id": entityId || 0,
            "action_type":type
        }
        
        setLastRef(ref)

        if ( adsList[classOption] <= 1 && type === 1) {                              
            axios.post(`${process.env.GATSBY_API_URL}/per-click/per-view`, request, {headers: header}).then(result => {
                console.log('result view', result)
            })
        } else if (type === 2) {
            axios.post(`${process.env.GATSBY_API_URL}/per-click/per-view`, request, {headers: header}).then(result => {
                console.log('result click', result)
                
                if (parseFloat(result.data.remaining_budget) <= 0) {

                    loadAds(language, entityId ? `entity_id=${entityId}` : 'home=1').then(res => {
                        if (classOption === 'advertisementTop') {
                            readAndGenerateTopAd(res.data)                            

                        } else if ( classOption === 'advertisementMid') {
                            getHomeMiddleTextAd(res.data)                   

                        } else {
                            Emitter.emit('ADS_RANDOM_EVENT', res.data.filter(add => add.position === "2")[0])                           
                        }
                        
                        if (campaignId !== ref.current.children[0].getAttribute('data-campaign') && id !== ref.current.children[0].id) {
                            adsList[classOption] = 0
                            requestViewAction(ref, classOption)
                        }
                    })
                } 
            })
        }

        adsList[classOption] = adsList[classOption] + 1
    }

    const handleScroll = () => {
        const element = ref.current.children[0]      
        if (element ) {
            let position = element.getBoundingClientRect()
            if (position.top >= 0 && position.bottom <= window.innerHeight) {
                if (element.id ) sendRequest(parseInt(element.id), element.getAttribute('data-campaign'), 1)
            }
        }
    }

    const handleClick = (ref) => {
       const element = ref.current.children[0]
       sendRequest(parseInt(element.id), element.getAttribute('data-campaign'), 2)      
    }

    const requestViewAction = (ref, type) => {
        if (ref.current) {
            if (type === 'all') {
                if (ref.current.className.includes('advertisementTop') || ref.current.className.includes('advertisementMid')) {
                    if (ref.current.id ) sendRequest(parseInt(ref.current.id), ref.current.getAttribute('data-campaign'), 1)
                }   

            } else {
                if (ref.current.className.includes(type)) {
                    if (ref.current.children[0].id ) sendRequest(parseInt(ref.current.children[0].id), ref.current.children[0].getAttribute('data-campaign'), 1)
                }  
            }                     
        }
    }


    useEffect(() => {    
        isBrowser && window.addEventListener('scroll', handleScroll)
        isBrowser && handleScroll()

        requestViewAction(ref, 'all')
        
        return () => {
             window.removeEventListener('scroll', handleScroll)
            }
    }, [classOption])

    return (
        
        <div ref={ref} className={componentClass} onClick={() => handleClick(ref)}>
            {
                mediaType === 'image' ?  
                <a id={addUUID} data-campaign={campaignId}  href={destinationLink} target={targetAction}>
                    <img src={mediaUrl} alt={altDescription} title={title}/>
                </a> 
            : 
            !!addUUID && <Video addUUID={addUUID} type={mediaType} source={mediaUrl} />
            }
           
        </div>
    )
}

export default Advertisement
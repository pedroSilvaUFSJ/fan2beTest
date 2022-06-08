import Emitter from "./emitter"
import {AdsRequestAdapter} from "../components/advertisments-module/atoms/advertisement/advertisement";
import axios from 'axios'
import { urlGgeneratedByLanguage } from "../utils/utils";

export function readAndGenerateTopAd(ads) {
    const topAds = AdsRequestAdapter(ads.find(ad => ad?.position === '0'));
    Emitter.emit('TOP_AD_EVENT', topAds);
}

export function getTopAd(ads) {
    return ads.find(ad => parseInt(ad?.position) === 0)
}

export function getHomeTopAd(ads) {
    return ads.find(ad => parseInt(ad?.position) === 0 && parseInt(ad?.home) === 1)
}

export function getMiddleTextAd(ads) {
    const middleAds = ads.find(ad => parseInt(ad?.position) === 1)
    Emitter.emit('MIDDLE_AD_EVENT', middleAds);
    return middleAds
}

export function getHomeMiddleTextAd(ads) {
    const middleAds = ads.find(ad => parseInt(ad?.position) === 1 && parseInt(ad?.home) === 1)
    Emitter.emit('MIDDLE_AD_EVENT', middleAds);
    return middleAds
}

export function getSideAd(ads) {
    return ads.find(ad => parseInt(ad?.position) === 2)
}

export function getHomeSideAd(ads) {
    return ads.find(ad => parseInt(ad?.position) === 2 && parseInt(ad?.home) === 1)
}

export function randomPickAds(ads) {
    const grouped = []
    ads.forEach(item => grouped[item.position] == undefined ? grouped[item.position] = [item] : grouped[item.position].push(item))
    return grouped.map(item => item[Math.floor(Math.random() * item.length)])
}

export function adsObjectStruct (ads){
    const position = [1,2,3] //ads position
    const list = []
    ads.forEach((item) => {
        if (parseFloat(item.remaining_budget) > 0) {
            for (let elt in position) {                    
                    let adElet = { 
                        ... item[position[elt]], 
                        id: item.advertisement_id, 
                        campaignId: item.campaign_id,
                        url: item.url,
                        title: item.advertisement,
                        home: item.home,
                        budget: item.remaining_budget
                    }

                    list.push(adElet)
                }               
        }
    })


    return randomPickAds(list)
}

export async function loadAds(language, params) {
    return axios.get(`${urlGgeneratedByLanguage(language)}/api/get-all-campaign-advertisements?${params}`).then(result => {
        return new Promise((resolve) => {
            resolve({data: adsObjectStruct(result.data)})
        })
    })
}



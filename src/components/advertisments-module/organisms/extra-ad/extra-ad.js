import React, { useEffect, useState } from 'react'
import Advertisement from '../../atoms/advertisement/advertisement'
import * as Style from './extra-ad.module.scss'
import { urlGgeneratedByLanguage } from '../../../../utils/utils'
import { useI18next } from 'gatsby-plugin-react-i18next';
import axios from 'axios'


const ExtraAd = () => {

    const { language } = useI18next()


    const [properties, setProperties] = useState({
        mediaUrl: '',
        mediaType: 'image',
        destinationLink: '/advertisement/colson-form',
        target: '_self'
    })

    const setParameters = ({mediaUrl}) => {
        setProperties({...properties, mediaUrl})
    }

    const header = { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }

    useEffect(() => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/get-custom-advertisement`,{}).then(result => {
            if(result.data && result.data[0]) {
                const props = result.data[0]
                setParameters({mediaUrl: props.image_url})
            }
        }).catch(error => {
            console.log(error)
        })
    }, [language])

    return <div className={Style.colsonContent}>
        <Advertisement {...properties}/>
    </div>

}


export default ExtraAd;
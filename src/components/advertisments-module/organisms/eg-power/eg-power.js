import { useI18next } from 'gatsby-plugin-react-i18next'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as style from './eg-power.module.scss'
import { urlGgeneratedByLanguage } from '../../../../utils/utils'

const EgPower = ({entityId}) => {
    const { language } = useI18next()


    const [properties, setProperties] = useState({
        mediaUrl: '',
        alt: '',
        title: ''
    })

    useEffect(() => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/get-eg-power-banner-image`,{}).then(result => {
            if(result.data && result.data[0]) {
                const props = result.data[0]
                setProperties({mediaUrl: props.eg_power_image, alt: props.alt, title: props.title})
            }
        }).catch(error => {
            console.log(error)
        })
    }, [language])

    return <div className={style.egContent}>
        <a href={`/advertisement/egpower-form?entityId=${entityId}`} target="_self">
            <img src={properties.mediaUrl} title={properties.title} alt={properties.alt}/>
        </a>
    </div>
}

export default EgPower
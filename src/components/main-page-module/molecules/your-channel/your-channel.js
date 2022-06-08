import React from 'react'

import tvImage from '../../../../images/tv.svg' 
import * as yourChannelStyles from './your-channel.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'gatsby-plugin-react-i18next';


const YourChannel = () => {
    const labelProps = {
        title: useTranslation().t('yourchannel.title'),
        quote: useTranslation().t('yourchannel.quote'),
        linkMessage: useTranslation().t('yourchannel.linkMessage'),
        email: useTranslation().t('yourchannel.email'),
        subject: useTranslation().t('yourchannel.subject'),
        body: useTranslation().t('yourchannel.body'),
        goToAdsForm: useTranslation().t('yourchannel.goToAdsForm'),
        goToAdsBtn: useTranslation().t('yourchannel.goToAdsBtn')
    }

    return (
        <div className='container'>
            <div className={`${yourChannelStyles.container}`}>
                <div className={yourChannelStyles.content}>
                    <img className={yourChannelStyles.image} src={tvImage} alt={labelProps.title}></img>
                    <div className={yourChannelStyles.info}>

                        <h2 className={yourChannelStyles.title}>{labelProps.title}</h2>
                        <p className={yourChannelStyles.quote}>{labelProps.quote}</p>
                        <a href='/account/register-club/'>
                            <p className={yourChannelStyles.linkMessage}>
                                {labelProps.linkMessage}
                                <FontAwesomeIcon icon='arrow-right'></FontAwesomeIcon>
                            </p>
                        </a>

                    </div>
                </div>
                <div className={yourChannelStyles.content_ads}>                   
                    <div className={yourChannelStyles.info}>
                        
                        <h2 className={yourChannelStyles.title}>{labelProps.goToAdsForm}</h2>
                        <a href='/advertisement/request'>
                            <p className={yourChannelStyles.linkMessage}>
                                 {labelProps.goToAdsBtn}
                                <FontAwesomeIcon icon='arrow-right'></FontAwesomeIcon>
                            </p>
                        </a>

                    </div>
                    <div className={yourChannelStyles.emptyBox}>

                    </div>
                </div>
            </div>
            
        </div >
    )
}

export default YourChannel
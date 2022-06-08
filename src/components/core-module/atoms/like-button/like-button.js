import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'

import PropTypes from "prop-types"
import likeIcon from '../../../../images/like.svg'
import Emitter from '../../../../services/emitter'
import * as menuTabButtonStyle from "./like-button.module.scss"
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"


const LikeButton = ({ className, interestId, hideText }) => {

    const liked = useTranslation().t('likebutton.liked')
    const toLike = useTranslation().t('likebutton.tolike')

    const [isPageLiked, setIsPageLiked] = useState(false)
    const [buttonTag, setButtonTag] = useState(toLike)

    const isBrowser = () => typeof window !== "undefined"
    const userId = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenId"))
    const { language } = useI18next()

    const submitLike = async () => {
        if (!userId ) {
            Emitter.emit('OPEN_SIDE_BAR', 3);
            return
        }  

        if (isPageLiked) return /** update when there is a new service for unliking */
        const csrf_token = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenCSRF"))
    
        const queryString = isBrowser() && window ? window.location.search : ''
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        interestId = interestId || id

        const body = [
            {
                uid: userId,
                interested_area_nid: interestId
            }
        ]
        const header = {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf_token,
        }
        axios.post(`${process.env.GATSBY_API_URL}/api/subscribe`, body, { headers: header }).then((response) => {
            setIsPageLiked(true);
            setButtonTag(liked)
        })
    }

    useEffect(() => {
        if ( userId && interestId) {
            axios.get(`${urlGgeneratedByLanguage(language)}/api/check-subscribed-area?_fromat=json&user_id=${userId}&area=${interestId}`).then((response) => {
                const interest = response.data.some(result => { return result.subscribed_area_id === interestId })
                setIsPageLiked(interest)
                if (interest) { setButtonTag(liked) }
            })
        }
  
    }, [language, userId, interestId]);

    return (
        <div className={`${menuTabButtonStyle.button} ${className ? className : ''} ${!isPageLiked ? 'not-liked' : ''}`} onClick={() => submitLike()}>
            <img className={menuTabButtonStyle.imageIcon} src={likeIcon} alt={'like icon'} />
            {!hideText && <span>{buttonTag}</span>}
        </div>
    )
}

LikeButton.propTypes = {
    className: PropTypes.any,
}

export default LikeButton

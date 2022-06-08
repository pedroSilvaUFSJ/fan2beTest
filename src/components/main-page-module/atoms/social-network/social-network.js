import React from "react"
import PropTypes from "prop-types"

import * as  styles from './social-network.module.scss'

import facebook from '../../../../images/facebook-icon.svg'
import whatsapp from '../../../../images/whatsapp-icon.svg'
import twitter from '../../../../images/twitter-icon.svg'

const SocialNetwork = ({ horizontal, location, className }) => {
    const url = location?.pathname;
    return (
        <div className={`${styles.content} ${!!horizontal ? styles.horizontal : ''} ${className ? className : ''}`}>
            <a key='facebook_button' className={styles.item} target='_blank' rel="noreferrer" href={`https://www.facebook.com/sharer.php?u=${url}`} >
                <img src={facebook} alt='facebook button' />
            </a>
            <a key='twitter_button' className={styles.item} target='_blank' rel="noreferrer" href={`https://twitter.com/share?text=${url}`} >
                <img src={twitter} alt='twitter button' />
            </a>
            <a key='whatsapp_button' className={styles.item} target='_blank' rel="noreferrer" href={`whatsapp://send?text= Have a look at this ${url}`} >
                <img src={whatsapp} alt='whatsapp button' />
            </a>
        </div>
    )
}

SocialNetwork.propTypes = {
    horizontal: PropTypes.bool,
}

export default SocialNetwork
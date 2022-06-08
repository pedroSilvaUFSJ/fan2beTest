import React from 'react'
import PropTypes from "prop-types"
import shareIcon from '../../../../images/share.svg'

import * as menuTabButtonStyle from "./share-button.module.scss"

const clickHandler = () => {
    // console.log('like clicked');
}

const ShareButton = ({ className }) => {
    const text = 'delen';
    return (
        <button className={`${menuTabButtonStyle.button} ${className ? className : ''}`} onClick={() => clickHandler()}>
            <img className={menuTabButtonStyle.imageIcon} src={shareIcon} alt={'share icon'} /><p>{text}</p>
        </button>
    )
}

ShareButton.propTypes = {
    className: PropTypes.any,
}

export default ShareButton
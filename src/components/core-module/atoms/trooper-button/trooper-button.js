import React from 'react'
import * as TrooperButtonStyle from './trooper-button.module.scss'
import trooperIcon from '../../../../images/trooper-logo.png'

const TrooperButton = ({isEnabled, url}) => {
    
    if(Number(isEnabled) !== 1 || !url) {
        return <></>
    }

    return (
        <div className={TrooperButtonStyle.logo}>
            <a href={url} target="_blank">
                <img src={trooperIcon} alt={'trooper icon'}/>
            </a>
        </div>
    )
}

export default TrooperButton;
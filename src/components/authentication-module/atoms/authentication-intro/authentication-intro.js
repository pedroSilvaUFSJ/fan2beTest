import React from 'react'

import * as  authenticationIntroStyles from './authentication-intro.module.scss'
import greenLogo from "../../../../images/footer-icon.svg"

const AuthenticationIntro = ({ title, text, hideImage }) => {

    const classSize = hideImage ? authenticationIntroStyles.maxWidth : ''

    return (
        <div className={`${authenticationIntroStyles.intro}`}>
            <div className={classSize}>
                <h1 className={`${authenticationIntroStyles.title}`}>{title}</h1>
                <p className={`${authenticationIntroStyles.text}`}>{text}</p>
            </div>
            {
                !hideImage && 
                <div>
                    <img className={`${authenticationIntroStyles.greenLogo}`} alt='green company logo' src={greenLogo} />
                </div>
            }
        </div>
    )
}

export default AuthenticationIntro
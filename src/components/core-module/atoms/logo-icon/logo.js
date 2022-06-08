import React from 'react'

import * as LogoStyles from './logo.module.scss'
import logoImage from "../../../../images/logo.svg"

const LogoIcon = () => {

    return (
        <div className={LogoStyles.logo}>
            <img src={logoImage} alt="company lettering" />
        </div>
    )
}

export default LogoIcon
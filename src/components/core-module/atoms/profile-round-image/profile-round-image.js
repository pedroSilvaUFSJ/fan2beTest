import React from 'react'

import * as profileRoundImage from './profile-round-image.module.scss'
import userImage from '../../../../images/profile.svg'

const ProfileRoundImage = ({ src, alt_text }) => {
    const imageName = src?.substr(src.lastIndexOf("/") + 1)
    return (
        <div className={profileRoundImage.item}>
            {imageName && <img src={src} alt={alt_text}></img>}
            {!imageName && <img src={userImage} alt={alt_text}></img>}
        </div>
    )
}

export default ProfileRoundImage

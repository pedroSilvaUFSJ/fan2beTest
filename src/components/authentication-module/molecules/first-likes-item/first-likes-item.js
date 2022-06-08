import React from 'react'
import LikeButton from '../../../core-module/atoms/like-button/like-button'
import ProfileRoundImage from '../../../core-module/atoms/profile-round-image/profile-round-image'

import * as firstLikesItem from './first-likes-item.module.scss'

const FirstLikesItem = ({ imgurl, name, interestId, showLike }) => {
    return (
        <div className={firstLikesItem.item}>
            <div className={firstLikesItem.entityId}>
                <ProfileRoundImage src={imgurl} />
                <span>{name}</span>
                {showLike && <LikeButton interestId={interestId} />}
            </div>
        </div>
    )
}

export default FirstLikesItem

import React from 'react'
import userImage from '../../../../images/profile.svg'

import * as notificationItemStyles from './notification-item.module.scss'

const NotificationItem = ({ logo, title, seen }) => {
    const alert = !seen
    const image = logo || userImage
    return <>
        <div className={notificationItemStyles.content}>
            <div className={notificationItemStyles.imageContent}>
                <img alt={title} src={`${image}`} className={alert ? notificationItemStyles.imageAlert : notificationItemStyles.imageNormal} />
                {!!alert && <div className={notificationItemStyles.circleStatus}></div>}
            </div>
            {/*<div className={notificationItemStyles.title}><span>{title}</span></div*/}
        </div>
    </>
}

export default NotificationItem
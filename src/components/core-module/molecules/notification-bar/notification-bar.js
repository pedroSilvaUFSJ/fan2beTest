import React, { useEffect, useState } from 'react';
import axios from 'axios'

import * as  NotificationBarStyles from './notification-bar.module.scss'
import NotificationItem from '../../atoms/notification-item/notification-item'
import { navigate } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from '../../../../utils/utils';

const NotificationBar = ({ updateCounter }) => {

    const [notifications, setNotifications] = useState([])
    const [postedNotification, setPostedNotification] = useState(false)
    const { language } = useI18next()
    
    const noNotification = {
        nl: 'Geen melding',
        en: 'No notifications',
    }

    const openNotification = (notification) => {
        //POST NOTIFICATION SEEN 
        const isBrowser = () => typeof window !== "undefined"
        const csrf_token = isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        const body = { nid: notification.nid }
        const header = { 'X-CSRF-Token': csrf_token }
        axios.post(`${process.env.GATSBY_API_URL}/api/article-unseen`, body, { headers: header })
            .then(() => { setPostedNotification(notification.nid) })
        navigate(`/main/entity?id=${notification.subscribed_area_nid}`, { replace: true })
    }

    const sortNotificationsDesc = (notifications) => {
        const filterFirst10Items = (item) => (item.slice(0,10));
        return filterFirst10Items(notifications.sort((a, b) => (b.nid - a.nid)))
    }

    useEffect(() => {
        const isBrowser = () => typeof window !== "undefined"
        const userId = isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenId"))
        if (!userId) return
        axios.get(`${urlGgeneratedByLanguage(language)}/api/get-notification-data?uid=${userId}&seen_status=0`).then((response) => {
            const allNotifications = sortNotificationsDesc(response.data.data)
            setNotifications(allNotifications)
            updateCounter(allNotifications.length)
        })
    }, [postedNotification, language])

    return (
        <div className={NotificationBarStyles.content}>
                {
                    notifications && notifications.length > 0 
                        ? (
                            <div className={NotificationBarStyles.draggable} draggable="true" > 
                                { notifications.map((notification, index) => (
                                        <div style={{ textDecoration: "none" }} key={`circle-item-key${index}`} onClick={() => openNotification(notification)}>
                                            <NotificationItem logo={notification.logo} title={notification.subscribed_area} seen={false} />
                                        </div>
                                    ))
                                }
                            </div>
                          ) 
                        : <div style={{textAlign: "center"}}><div style={{ textDecoration: "none"}}>{noNotification[language]}</div></div>
                }
        </div>
    )
}

export default NotificationBar
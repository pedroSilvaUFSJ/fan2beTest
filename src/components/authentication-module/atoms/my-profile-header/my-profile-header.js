import React from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'

import * as  myProfileHeaderStyles from './my-profile-header.module.scss'
import logoffIcon from '../../../../images/logoff.svg'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"

const MyProfileHeader = () => {
    const { language } = useI18next()
    const propLabels = {
        title: useTranslation().t('myprofile.header.title'),
        logoffbuttonlabel: useTranslation().t('myprofile.header.buttonlabel')
    }

    const logoff = () => {
        /** Get tokens */
        const isBrowser = () => typeof window !== "undefined"
        const token_logout = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenLogout"))
        const csrf_token = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        const header = { 'X-CSRF-Token': csrf_token }
        axios.post(`${urlGgeneratedByLanguage(language)}/user/logout?_format=json&token=${token_logout}`, {}, { headers: header })
            .then(() => {
                isBrowser() && window && window.localStorage.removeItem("tokenLogout")
                isBrowser() && window && window.localStorage.removeItem("tokenCSRF")
                isBrowser() && window && window.localStorage.removeItem("tokenId")
                navigate("/", { replace: true })
            }).catch(err => {
                isBrowser() && window && window.localStorage.removeItem("tokenLogout")
                isBrowser() && window && window.localStorage.removeItem("tokenCSRF")
                isBrowser() && window && window.localStorage.removeItem("tokenId")
                navigate("/", { replace: true })
            })
    }

    return (
        <>
            <h1>{propLabels.title}</h1>
            <div className={myProfileHeaderStyles.logoff} onClick={() => { logoff() }}>
                <img className={myProfileHeaderStyles.imageIcon} src={logoffIcon} alt={'like icon'} title={propLabels.logoffbuttonlabel}/><span>{propLabels.logoffbuttonlabel}</span>
            </div>
        </>
    )
}

export default MyProfileHeader
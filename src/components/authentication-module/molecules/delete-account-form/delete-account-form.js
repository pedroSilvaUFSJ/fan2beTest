import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'gatsby'
import { navigate } from 'gatsby'

import * as deleteAccountFormStyles from './delete-account-form.module.scss'
import { useTranslation } from 'gatsby-plugin-react-i18next';

const DeleteAccountForm = () => {

    const [showWarning, setShowWarning] = useState(false)
    const propLabels = {
        deletetext: useTranslation().t('deleteaccount.text'),
        deletetextinfo: useTranslation().t('deleteaccount.info'),
        deleteConfirmationLabel: useTranslation().t('deleteaccount.confirmation'),
        yesLabel: useTranslation().t('deleteaccount.yes'),
        cancelLabel: useTranslation().t('deleteaccount.cancel')
    }

    const confirmDelete = () => {
        setShowWarning(false)
        const isBrowser = () => typeof window !== "undefined"
        const id = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenId"))
        const csrf_token = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        const header = { 'X-CSRF-Token': csrf_token }
        axios.delete(`${process.env.GATSBY_API_URL}/user/${id}?_format=json`, {}, { headers: header })
            .then(() => {
                isBrowser() && window && window.localStorage.removeItem("tokenLogout")
                isBrowser() && window && window.localStorage.removeItem("tokenCSRF")
                isBrowser() && window && window.localStorage.removeItem("tokenId")
                navigate("/", { replace: true })
            })
    }

    return (
        <div className={deleteAccountFormStyles.wrapper}>
            <span className={deleteAccountFormStyles.wrapper}>{propLabels.deletetext}</span><br />

            {
                !showWarning &&
                <div role="button" className={`green-button ${deleteAccountFormStyles.button}`} onClick={() => { setShowWarning(true) }}>
                    <span>{propLabels.deletetextinfo}</span>
                </div>
            }
            {
                showWarning &&
                <>
                    <span className={deleteAccountFormStyles.warn}>{propLabels.deletetextinfo}?</span>
                    <div role="button" className={`green-button ${deleteAccountFormStyles.button}`} onClick={() => { confirmDelete() }}>
                        <span>{propLabels.yesLabel}</span>
                    </div>
                    <div role="button" className={`green-button ${deleteAccountFormStyles.button}`} onClick={() => { setShowWarning(false) }}>
                        <span>{propLabels.cancelLabel}</span>
                    </div>
                </>
            }
        </div>
    )
}

export default DeleteAccountForm

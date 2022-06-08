import React, { useState } from 'react'
import axios from 'axios'

import * as RecoverFormStyles from './recover-form.module.scss'
import leftArrow from "../../../../images/left-arrow.svg"

import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"

const RecoverForm = ({ setVisibleFormTab }) => {
    const { language } = useI18next()
    const propLabels = {
        emailLabel: useI18next().t('recoverform.emailLabel'),
        okButtonLabel: useI18next().t('recoverform.okButtonLabel'),
        goBackLabel: useI18next().t('recoverform.goBackLabel'),
        errorMessageInvalidUsername: useI18next().t('recoverform.errorMessageInvalidUsername'),
        errorMessageLabel: useI18next().t('recoverform.errorMessageLabel'),
        successMessageTitle: useI18next().t('recoverform.successMessageTitle'),
        successMessageSubtitle: useI18next().t('recoverform.successMessageSubtitle'),
    }

    const [username, setUsername] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState('')

    const performRecover = () => {
        if (!(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username))) { setErrorMessage(propLabels.errorMessageInvalidUsername); return }

        const request = { name: username }
        axios.defaults.withCredentials = false
        axios.post(`${urlGgeneratedByLanguage(language)}/user/password?_format=json`, request)
            .then(() => { setSuccess(true) })
            .catch(error => { setErrorMessage(error.response.data.message) })
    }

    return (
        <div className={`${RecoverFormStyles.recover}`}>
            <form>
                {success &&
                    <div>
                        <h2>{propLabels.successMessageTitle}</h2>
                        <span>{propLabels.successMessageSubtitle}</span>
                    </div>
                }
                {!success &&
                    <form>
                        <label htmlFor='username'>{propLabels.emailLabel}<span>*</span></label>
                        <input id="username" type="text" onChange={event => { setUsername(event.target.value); setErrorMessage() }} />

                        {errorMessage !== '' && <span className={`red-text ${RecoverFormStyles.alert}`}>{errorMessage}</span>}

                        <div className={`${RecoverFormStyles.links}`}>
                            <div className={`green-button ${RecoverFormStyles.button}`} onClick={performRecover}>{propLabels.okButtonLabel}</div>
                        </div>
                    </form>
                }
                <div className={`${RecoverFormStyles.goback}`} onClick={() => { setVisibleFormTab(1) }}>
                    <img src={leftArrow} alt={propLabels.goBackLabel}/>
                    <span>{propLabels.goBackLabel}</span>
                </div>
            </form>
        </div>
    )

}

export default RecoverForm;
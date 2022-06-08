import React, { useState } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'
import { Buffer } from 'buffer'

import * as loginFormStyles from './login-form.module.scss'
import { useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Emitter from '../../../../services/emitter'

const LoginForm = ({ updateVisibleTab }) => {

    const { language } = useI18next()
    const propLabels = {
        emailAddressLabel: useI18next().t('loginform.emailAddressLabel'),
        passwordLabel: useI18next().t('loginform.passwordLabel'),
        okButtonLabel: useI18next().t('loginform.okButtonLabel'),
        forgotPasswordButtonLabel: useI18next().t('loginform.forgotPasswordButtonLabel'),
        errorMessageLabel: useI18next().t('loginform.errorMessageLabel'),
        errorMessageInvalidUsername: useI18next().t('loginform.errorMessageInvalidUsername'),
        errorMessageInvalidPassword: useI18next().t('loginform.errorMessageInvalidPassword'),
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showPwd, setShowPwd] = useState(false)

    const encodeBase64 = (username, password) => {
        return Buffer.from(`${username}:${password}`).toString('base64');
    }

    const authenticate = () => {
        if (username === '' || password === '') return
        if (!(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username))) { setErrorMessage(propLabels.errorMessageInvalidUsername); return }

        const isBrowser = () => typeof window !== "undefined"
        const csrf_token = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        const body = { name: username, pass: password }
        const header = { 'X-CSRF-Token': csrf_token }
        const queryString = isBrowser() && window ? window.location.search : ''
        const urlParams = new URLSearchParams(queryString);
        const articleId = urlParams.get('id');

        axios.post(`${urlGgeneratedByLanguage(language)}/user/login?_format=json`, body, { headers: header })
            .then((response) => {
                const isBrowser = () => typeof window !== "undefined"
                isBrowser() && window !== 'undefined' && window.localStorage.setItem("tokenLogout", JSON.stringify(response.data.logout_token))
                isBrowser() && window !== 'undefined' && window.localStorage.setItem("tokenCSRF", JSON.stringify(response.data.csrf_token))
                isBrowser() && window !== 'undefined' && window.localStorage.setItem("tokenId", JSON.stringify(response.data.current_user.uid))
                isBrowser() && window !== 'undefined' && window.localStorage.setItem("tokenAuth", JSON.stringify(`Basic  ${encodeBase64(username, password)}`))

                if (response.data.firstLogin === '1' ) {
                    navigate("/account/first-login", { replace: true })
                }

                if ( articleId ) {
                    Emitter.emit('OPEN_SIDE_BAR',  0)
                } else {
                    navigate("/", { replace: true })
                }
            })
            .catch(error => { setErrorMessage(error.response.data.message) })
    }

    return (
        <div className={`${loginFormStyles.form}`} >
            <form>
                <div className={`${loginFormStyles.fields}`}>
                    <label htmlFor="username">{propLabels.emailAddressLabel}<span> *</span></label>
                    <input id="username" type="text" onChange={event => { setUsername(event.target.value); setErrorMessage('') }} />
                </div>                

                <div className={`${loginFormStyles.fields}`}>
                    <label htmlFor='password'>{propLabels.passwordLabel}<span> *</span></label>
                    <input id="password" type={!showPwd ? "password" : "text"} onChange={event => { setPassword(event.target.value); setErrorMessage('') }} />
                    <FontAwesomeIcon  icon={ !showPwd ? 'eye': 'eye-slash'} size="lg" className={`${loginFormStyles.password}`} onClick={() => setShowPwd(!showPwd)} /> 
                </div>
                

            </form>

            {errorMessage !== '' && <span className={`red-text ${loginFormStyles.alert}`}>{errorMessage}</span>}
            <div className={`${loginFormStyles.links}`}>
                <div className={`${loginFormStyles.button} ${(username === '' || password === '') ? 'disabled-button' : 'green-button'} `} onClick={authenticate}>
                    <span>{propLabels.okButtonLabel}</span>
                </div>
                <span onClick={() => { updateVisibleTab(3) }}>{propLabels.forgotPasswordButtonLabel}</span>
            </div>
        </div >
    )
}

export default LoginForm;
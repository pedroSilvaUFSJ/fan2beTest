import React, { useState } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import { navigate } from 'gatsby'
import { Buffer } from 'buffer'

import * as registerFormStyles from './register-form.module.scss'

import { useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const RegisterForm = () => {
    const propLabels = {
        errorMessageSamePassword: useI18next().t('registerform.errorMessageSamePassword'),
        errorMessageInvalidUsername: useI18next().t('registerform.errorMessageInvalidUsername'),
        errorMessageInvalidPassword: useI18next().t('registerform.errorMessageInvalidPassword'),
        errorMessageLabel: useI18next().t('registerform.errorMessageLabel'),
        emailLabel: useI18next().t('registerform.emailLabel'),
        passwordLabel: useI18next().t('registerform.passwordLabel'),
        passwordHintLabel: useI18next().t('registerform.passwordHintLabel'),
        passwordConfirmLabel: useI18next().t('registerform.passwordConfirmLabel'),
        newsletterLabel: useI18next().t('registerform.newsletterLabel'),
        termsLabel1: useI18next().t('registerform.termsLabel1'),
        termsLabel2: useI18next().t('registerform.termsLabel2'),
        termsLabel3: useI18next().t('registerform.termsLabel3'),
        termsLabel4: useI18next().t('registerform.termsLabel4'),
        termsLabel5: useI18next().t('registerform.termsLabel5'),
        okButtonLabel: useI18next().t('registerform.okButtonLabel'),
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [newsletter, setNewsletter] = useState(false)
    const [terms, setTerms] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { language } = useI18next()
    const [showPwd, setShowPwd] = useState(false)
    const [showConfirmationPwd, setShowConfirmationPwd] = useState(false)

    const encodeBase64 = (username, password) => {
        return Buffer.from(`${username}:${password}`).toString('base64');
    }

    const performRegister = () => {
        if (passwordConfirm !== password) { setErrorMessage(propLabels.errorMessageSamePassword); return }
        if (!(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!?#@$\\\/º"',={}()%+.^&*])(?=.{8,})/.test(password))) { setErrorMessage(propLabels.errorMessageInvalidPassword); return }
        if (!(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) { setErrorMessage(propLabels.errorMessageInvalidUsername); return }
        if (!terms) { setErrorMessage(propLabels.errorMessageLabel);  return }

        const request = {
            name: { value: email },
            mail: [{ value: email }],
            pass: [{ value: password }],
            status: [{ value: true }],
            timezone: [{ value: "Europe/Brussels" }],
            preferred_langcode: [{ value: "en" }],
            roles: ["fans"],
            field_accept_terms: [{ value: terms }],
        }
        if (newsletter) { request.field_subscribe_fan2be_letter = [{ value: newsletter }] }

        const body = { name: email, pass: password }
        const header = { 'Content-Type': 'application/json' }

        axios.defaults.withCredentials = false
        axios.post(`${process.env.GATSBY_API_URL}/entity/user?_format=json`, request)
            .then((response) => {
                const isBrowser = () => typeof window !== "undefined"
                isBrowser() && window && window.localStorage.setItem("tokenId", JSON.stringify(response.data.uid[0].value))

                axios.post(`${urlGgeneratedByLanguage(language)}/user/login?_format=json`, body, { headers: header })
                    .then((response) => {
                        const isBrowser = () => typeof window !== "undefined"
                        isBrowser() && window !== 'undefined' && window.localStorage.setItem("tokenLogout", JSON.stringify(response.data.logout_token))
                        isBrowser() && window !== 'undefined' && window.localStorage.setItem("tokenCSRF", JSON.stringify(response.data.csrf_token))
                        isBrowser() && window !== 'undefined' && window.localStorage.setItem("tokenId", JSON.stringify(response.data.current_user.uid))
                        isBrowser() && window !== 'undefined' && window.localStorage.setItem("tokenAuth", JSON.stringify(`Basic  ${encodeBase64(email, password)}`))
                        navigate("/account/first-login/", { replace: true })
                    })
                    .catch(error => { setErrorMessage(error.response.data.message) })
            })
            .catch(error => { setErrorMessage(error.response.data.message) })
    }

    const isComplete = () => {
        return (email !== '' && password !== '' && passwordConfirm !== '' && password === passwordConfirm && terms)
    }

    return (
        <div className={`${registerFormStyles.form}`} >
            <form>
                <div className={`${registerFormStyles.fields}`}>
                    <label htmlFor='email' >{propLabels.emailLabel}<span> *</span></label>
                    <input id="email" type="text" onChange={event => { setEmail(event.target.value); setErrorMessage() }} />
                </div>
                
                <div className={`${registerFormStyles.fields}`}>
                    <label htmlFor='password'>{propLabels.passwordLabel}<span> *</span></label>
                    <span>{propLabels.passwordHintLabel}</span>
                    <input id="password" type={!showPwd ? "password" : "text"} onChange={event => { setPassword(event.target.value); setErrorMessage() }} />
                    <FontAwesomeIcon  icon={ !showPwd ? 'eye': 'eye-slash'} size="lg" className={`${registerFormStyles.confirmationPassword}`} onClick={() => setShowPwd(!showPwd)} /> 
                </div>

                <div className={`${registerFormStyles.fields}`}>
                    <label htmlFor='passwordconfirmation'>{propLabels.passwordConfirmLabel}<span> *</span></label>
                    <input id="passwordconfirmation" type={!showConfirmationPwd ? "password" : "text"} onChange={event => { setPasswordConfirm(event.target.value); setErrorMessage() }} />
                    <FontAwesomeIcon  icon={ !showConfirmationPwd ? 'eye': 'eye-slash'} size="lg" className={`${registerFormStyles.password}`} onClick={() => setShowConfirmationPwd(!showConfirmationPwd)} /> 

                </div>

                <div className={`${registerFormStyles.checkboxes}`} >
                    <div>
                        <input type="checkbox" id="newsletter" onChange={() => { setNewsletter(!newsletter); setErrorMessage() }} />
                        <label htmlFor="newsletter">{propLabels.newsletterLabel}</label>
                    </div>
                    <div>
                        <input type="checkbox" id="terms" onChange={() => { setTerms(!terms); setErrorMessage() }} />

                        <label htmlFor="terms">{propLabels.termsLabel1}
                            <Link to={'/company/privacy'}><span> {propLabels.termsLabel2} </span></Link> {propLabels.termsLabel3}
                            <Link to={'/company/legal'}><span> {propLabels.termsLabel4} </span></Link>
                            {propLabels.termsLabel5}</label>
                    </div>
                </div>

                <div className={registerFormStyles.submit}>
                    {<span className={`red-text ${registerFormStyles.errorMessage}`}>{errorMessage}</span>}

                    <div className={`${registerFormStyles.links} ${isComplete() ? 'green-button' : 'disabled-button'} `}
                        onClick={performRegister}>
                        <span>{propLabels.okButtonLabel}</span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;
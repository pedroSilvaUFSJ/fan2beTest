import React, { useState } from 'react'
import axios from 'axios'
import * as  newsletterStyles from './newsletter.module.scss'
import SocialMediaButton from '../../atoms/social-media-button/social-media-button';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const labelProps = {
        subscription: {
            title: useTranslation().t('newsletter.subscription.title'),
            placeholder: useTranslation().t('newsletter.subscription.placeholder'),
            button: useTranslation().t('newsletter.subscription.button'),
            serviceError: useTranslation().t('newsletter.subscription.serviceerror'),
            serviceAlreadyExists: useTranslation().t('newsletter.subscription.servicealreadyexists'),
            serviceSuccess: useTranslation().t('newsletter.subscription.servicesuccess'),
            serviceEmailNotValid: useTranslation().t('newsletter.subscription.emailnotvalid')
        },
        social: {
            title: useTranslation().t('newsletter.social.title'),
            items: [
                { to: 'https://www.facebook.com/fan2be', icon: 'facebook-f' },
                { to: 'https://www.linkedin.com/company/fan2be/', icon: 'linkedin' },
                { to: 'https://www.instagram.com/fan2.be/', icon: 'instagram' }
            ]
        }
    }

    const emailOnUpdate = (event) => {
        setEmail(event.target.value)
        setErrorMessage('')
        setSuccessMessage('')
    }

    const onFormSubmit = e => {
        e.preventDefault();
        if (!(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) { setErrorMessage(labelProps.subscription.serviceEmailNotValid); return }

        const body = {
            "mail": [{ "value": email }],
            "subscriptions": [{ "target_id": "default" }]
        }
        axios.post(`${process.env.GATSBY_API_URL}/entity/simplenews_subscriber?_format=json`, body)
            .then(() => {
                setSuccessMessage(labelProps.subscription.serviceSuccess)
            }).catch(err => {
                if (err.response.status === 422) setErrorMessage(labelProps.subscription.serviceAlreadyExists)
                else setErrorMessage(labelProps.subscription.serviceError)
            })
    }

    return (
        <div className='container'>
            <div className={newsletterStyles.inner}>
                <div className={`${newsletterStyles.content}`}>

                    <form className={newsletterStyles.content__first} onSubmit={onFormSubmit}>
                        <h2 className={`${newsletterStyles.label}`} >{labelProps.subscription.title}:</h2>
                        {successMessage && <span className={newsletterStyles.subscription__sucess}>{successMessage}</span>}
                        {!successMessage &&
                            <div className={newsletterStyles.subscription}>
                                <input className={`${newsletterStyles.subscription__input}`} type="email" placeholder={labelProps.subscription.placeholder} onChange={(e) => emailOnUpdate(e)} />
                                <input className={`green-button ${newsletterStyles.subscription__submit}`} type="submit" value={labelProps.subscription.button} />
                            </div>
                        }
                        {errorMessage && <span className={newsletterStyles.subscription__error}>{errorMessage}</span>}
                    </form>
                    <div className={`${newsletterStyles.content__second}`}>
                        <h2 className={`${newsletterStyles.label}`}>{labelProps.social.title}:</h2>
                        <div className={newsletterStyles.socialNetwork}>
                            {labelProps.social.items?.map((item, index) => <SocialMediaButton key={`socialNetwork__${index}`}  {...item} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter

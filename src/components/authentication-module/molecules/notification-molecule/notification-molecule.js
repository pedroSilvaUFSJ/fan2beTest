import * as css from './notification-molecule.module.scss'
import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next';

export const Success = ({message, buttonLabel, buttonUrl}) => {

    const redirect = (url) => {
        window.location.href = url
    }

    if(!Array.isArray(message)) {
        message = [message]
    }

    return <div className={css.notificationSection}>
                {message.map(piece => <p className={css.message}>{piece}</p>)}
                <div className={css.actionsSection}>
                    <button onClick={() => redirect(buttonUrl)} className={css.register}>{buttonLabel}</button>
                    <button onClick={() => redirect('/')}>{useTranslation().t('content.backToHome')}</button>
                </div>
            </div>

}
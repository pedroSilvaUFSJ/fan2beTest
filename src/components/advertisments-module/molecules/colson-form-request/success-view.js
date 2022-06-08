import React from 'react'
import * as style from './colson-form-request.module.scss'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'
import { navigate } from 'gatsby'


const SuccessView = ({setView}) => {
    const translation = useTranslation()
    const { language } = useI18next()
    return (
        <div  className={style.success_view}>
            
            <div className={style.text}>
                <span>{translation.t('advertisement.thankYou')}</span>
            </div>

            <div className={style.btn_container}>
                <div className={style.formSections}>
                    <div className={`${style.submit}  ${style.submitClub} `}>
                    <div className={`${style.links} ${ 'green-button'} ${style.go_home}`}
                    onClick={() =>  navigate(`/${language}`, { replace: true })}>
                        <span>{translation.t('advertisement.goToHome')}</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SuccessView
import React, { useState } from 'react'
import { navigate } from 'gatsby'

import * as  userAuthStyles from './user-authentication.module.scss'
import x from '../../../../images/x.svg'

import LoginForm from '../../molecules/login-form/login-form'
import RegisterForm from '../../molecules/register-form/register-form'
import RecoverForm from '../../molecules/recover-form/recover-form'
import FooterPrivacyLegalNote from '../../../core-module/atoms/footer-privacy-legal-note/footer-privacy-legal-note'
import AuthenticationIntro from '../../atoms/authentication-intro/authentication-intro'

import { isUserLoggedIn } from '../../../../utils/check-user-auth'
import { useTranslation } from 'gatsby-plugin-react-i18next';

/**
 * Loads Authentication side pop up information
 * @param {*} authenticationScreenStatus > to control display of side menu
 * @returns 
 */
const UserAuthentication = ({ authenticationScreenStatus }) => {

    /**
     * setVisibleTab can hae values : 
     * 1 - login 
     * 2 - register
     * 3 - recover password 
     */
    const [visibleFormTab, setVisibleFormTab] = useState(() => 1);

    const title = useTranslation().t(visibleFormTab === 3 ? "auth.forgotpassword.title" : "auth.login.title")
    const text = useTranslation().t(visibleFormTab === 3 ? "auth.forgotpassword.text" : "auth.login.text")
    const menuLoginLabel = useTranslation().t("auth.menu.login")
    const menuRegisterLabel = useTranslation().t("auth.menu.register")

    return (
        <>
            <div id="grayBackground" className={`${userAuthStyles.grayBackground}`}></div>
            <div id="authBanner" className={`container ${userAuthStyles.auth}`}>

                <div onClick={() => { authenticationScreenStatus(null) }} >
                    <img className={`${userAuthStyles.close}`} alt='close menu' src={x} />
                </div>
                <AuthenticationIntro title={title} text={text} />

                <div className={`${userAuthStyles.authcontent}`}>
                    {visibleFormTab === 3 && <RecoverForm setVisibleFormTab={setVisibleFormTab} />}
                    {visibleFormTab !== 3 &&
                        <div className={`${userAuthStyles.formcontent}`}>
                            <div className={`${userAuthStyles.menu}`}>
                                <span onClick={() => { setVisibleFormTab(1) }} className={visibleFormTab === 1 ? `${userAuthStyles.selected}` : ''}>{menuLoginLabel}</span>
                                <span onClick={() => { setVisibleFormTab(2) }} className={visibleFormTab === 2 ? `${userAuthStyles.selected}` : ''}>{menuRegisterLabel}</span>
                            </div>

                            <div className={`${userAuthStyles.form}`}>
                                {visibleFormTab === 1 && <LoginForm updateVisibleTab={setVisibleFormTab} />}
                                {visibleFormTab === 2 && <RegisterForm />}
                            </div>
                        </div>
                    }
                </div>
                <div className={`${userAuthStyles.footnote}`}>
                    <FooterPrivacyLegalNote />
                </div>
            </div>
        </>
    )
}

export default UserAuthentication



import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import * as cookiesBannerStyle from './cookies_banner.module.scss'
import { Link, graphql } from 'gatsby'

import { useTranslation } from 'gatsby-plugin-react-i18next';

const CookiesBanner = () => {
    const [cookies, setCookie] = useCookies(['user_consent']);
    const [showCookies, setShowBanner] = useState(false)

    useEffect(() => {
        setShowBanner(Object.keys(cookies).length === 0 && cookies.constructor === Object)
    }, []);

    const acceptCookies = () => {
        let cookieExpire = new Date()
        cookieExpire.setMonth(cookieExpire.getMonth() + 10)

        setCookie('user_consent', 'consent_allow', {
            path: '/',
            expires: cookieExpire,
            sameSite: true
        });

        setShowBanner(false)
    }

    const dismmissCookies = () => {
        setCookie('user_consent', 'consent_not_allow', {
            path: '/',
            sameSite: true
        });

        setShowBanner(false)
    }
    const propLabels = {
        cookieText: useTranslation().t('cookiesbanner.cookietext'),
        cookieAccept: useTranslation().t('cookiesbanner.allow'),
        cookieCancel: useTranslation().t("cookiesbanner.decline"),
        cookiePolicy: useTranslation().t("cookiesbanner.policy")
    }

    return <>

    {
        
        !!showCookies &&
    
        <div className={cookiesBannerStyle.content} >
            <div className={cookiesBannerStyle.text}>
                <span>
                {propLabels.cookieText} <Link to={"/company/cookies"}>{propLabels.cookiePolicy}</Link>
                </span>
            </div>            
             <div className={cookiesBannerStyle.buttonContainer}>
                 <button className={cookiesBannerStyle.button__accept} onClick={acceptCookies}>{propLabels.cookieAccept}</button>
             </div>
        </div>
        }
    </>
}

export default CookiesBanner


export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
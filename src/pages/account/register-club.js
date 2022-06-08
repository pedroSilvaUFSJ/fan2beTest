import React, { useState } from 'react'

import * as registerStyles from './register.module.scss'

import RegisterFormClub from '../../components/authentication-module/molecules/register-form/register-form-club'
import {Success} from '../../components/authentication-module/molecules/notification-molecule/notification-molecule'
import AuthenticationIntro from '../../components/authentication-module/atoms/authentication-intro/authentication-intro'
import Layout from '../../templates/layout'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import SEO from '../../components/core-module/organisms/seo/seo'

const RegisterClub = () => {

    const [isFormSubmittedSuccessfully, setIsFormSubmittedSuccessfully] = useState(false)
    const { language } = useI18next()
    const propLabels = {
      siteTitle: useTranslation().t('sitename'),
      pageTabTitleSupplement: useTranslation().t('registerPage.club.pageTabTitleSupplement'),
      title: useTranslation().t('registerPage.club.title'),
      text: useTranslation().t('registerPage.club.text'),
      buttonLabel: useTranslation().t('content.registerNewClub'),
      buttonUrl: '/account/register-club/',
      thankYouMessage: useTranslation().t('content.thankYouNote'),
      reviewMessage: useTranslation().t('content.reviewMessage'),
      metaDescription: useTranslation().t('registerPage.club.metaDescription')
  }

    return (
        <Layout >
            <SEO {...{lang: language, title: `${propLabels.siteTitle} - ${propLabels.pageTabTitleSupplement}`, description: propLabels.metaDescription }}/>
            <div className={registerStyles.section}>
                <div className={'container '}>
                  <AuthenticationIntro title={propLabels.title} text={!isFormSubmittedSuccessfully && propLabels.text} hideImage={true}/>
                  {isFormSubmittedSuccessfully === false && 
                    <RegisterFormClub 
                        setSuccess={setIsFormSubmittedSuccessfully}
                    />
                  }
                  {isFormSubmittedSuccessfully === true && 
                    <Success 
                        buttonLabel={propLabels.buttonLabel} 
                        buttonUrl={propLabels.buttonUrl} 
                        message={[propLabels.thankYouMessage, propLabels.reviewMessage]}
                    />
                  }
                </div>
            </div>
        </Layout>
    )
}

export default RegisterClub

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
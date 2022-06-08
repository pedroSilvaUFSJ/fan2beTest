import React, { useState } from 'react'

import * as firstLoginStyles from './first-login.module.scss'

import Layout from '../../templates/layout'
import FullProfileForm from '../../components/authentication-module/molecules/full-profile-form/full-profile-form'
import FirstLikesForm from '../../components/authentication-module/molecules/first-likes-form/first-likes-form'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby'
import SEO from '../../components/core-module/organisms/seo/seo'

const FirstLogin = () => {

    const {language } = useI18next();
    const propLabels = {
        siteTitle: useTranslation().t('sitename'),
        pageTabTitleSupplement: useTranslation().t('firstLoginPage.pageTabTitleSupplement'),
        profile: {
            title: useTranslation().t('firstLoginPage.profile.title'),
            text: useTranslation().t('firstLoginPage.profile.text'),
        },
        interests: {
            title: useTranslation().t('firstLoginPage.interests.title'),
            text: useTranslation().t('firstLoginPage.interests.text'),
        }
    }

    const [visibleTab, setVisibleTab] = useState(() => 1);
    const [title, setTitle] = useState(() => propLabels.profile.title);
    const [text, setText] = useState(() => propLabels.profile.text);

    const updateTab = () => {
        setTitle(propLabels.interests.title)
        setText(propLabels.interests.text)
        setVisibleTab(2)
    }

    return (
        <Layout >
            <SEO {...{lang: language, title: `${propLabels.siteTitle} - ${propLabels.pageTabTitleSupplement}` }}/>
            <div className={firstLoginStyles.section}>
                <div className={'container ' + firstLoginStyles.container}>
                    {visibleTab === 1 && <>
                        <div className={firstLoginStyles.intro}>
                            <h1>{title}</h1>
                            <p>{text}</p>
                            <FullProfileForm showName={true} showCheckbox={false} userDetails={null} handleButtonClick={() => { updateTab() }} />
                        </div>
                    </>
                    }
                    {visibleTab === 2 && <>
                        <div className={firstLoginStyles.intro}>
                            <h1>{title}</h1>
                            <p>{text}</p>
                            <FirstLikesForm />
                        </div>
                    </>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default FirstLogin

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
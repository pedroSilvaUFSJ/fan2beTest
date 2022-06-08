import React, { useEffect, useState } from 'react'
import axios from 'axios'

import * as myProfileStyles from './my-profile.module.scss'

import FullProfileForm from '../../components/authentication-module/molecules/full-profile-form/full-profile-form.js'
import EditUserNamePasswordForm from '../../components/authentication-module/molecules/edit-username-password-form/edit-username-password-form'
import DeleteAccountForm from '../../components/authentication-module/molecules/delete-account-form/delete-account-form'
import MyProfileHeader from '../../components/authentication-module/atoms/my-profile-header/my-profile-header'

import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from '../../utils/utils'
import Layout from '../../templates/layout'
import { graphql, navigate } from 'gatsby'
import { isUserLoggedIn } from '../../utils/check-user-auth'
import SEO from '../../components/core-module/organisms/seo/seo'

const MyProfile = () => {

    const [userDetails, setUserDetails] = useState(null)
    const { language } = useI18next()
    const propLabels = {
        siteTitle: useTranslation().t('sitename'),
        pageTabTitleSupplement: useTranslation().t('myprofile.pageTabTitleSupplement'),
        accountInfo: useTranslation().t('myprofile.acountinfo'),
        personalInfo: useTranslation().t('myprofile.personalinfo'),
        profileInfo: useTranslation().t('myprofile.profileinfo'),
    }

    const loadHashedPassword = () => {
        return '***********';
    }

    useEffect(() => {
        if (!isUserLoggedIn()) { navigate("/account/login/", { replace: true }); return }

        /** Get tokens */
        const isBrowser = () => typeof window !== "undefined"
        const userId = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenId"))
        const csrf_token = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        /** body and header for REQUEST*/
        const header = { 'X-CSRF-Token': csrf_token }
        axios.get(`${urlGgeneratedByLanguage(language)}/user/${userId}?_format=json`, { headers: header }).then((response) => {
            setUserDetails({
                id: response.data.uid[0].value,
                email: response.data.mail[0].value,
                lastName: response.data.field_last_name[0]?.value,
                firstName: response.data.field_first_name[0]?.value,
                gender: response.data.field_gender[0]?.value,
                dateBirth: response.data.field_date_of_birth[0]?.value,
                phone: response.data.field_phone_number[0]?.value,
                street: response.data.field_street[0]?.value,
                nr: response.data.field_number[0]?.value,
                bus: response.data.field_bus[0]?.value,
                post: response.data.field_postal_code[0]?.value,
                news: response.data.field_subscribe_fan2be_letter[0]?.value,
                city: response.data.field_city[0]?.value
            })
        })
    }, [language])

    return (
        <Layout >
            <SEO {...{lang: language, title: `${propLabels.siteTitle} - ${propLabels.pageTabTitleSupplement}` }}/>
            <div className={myProfileStyles.section}>
                {userDetails &&
                    <>
                        <div className={myProfileStyles.header}>
                            <div className={'container ' + myProfileStyles.container}>
                                <MyProfileHeader />
                            </div>
                        </div>

                        <div className={'container '}>
                            <div className={myProfileStyles.content}>
                                <h2>{propLabels.accountInfo}</h2>
                                <EditUserNamePasswordForm username={userDetails.email} password={loadHashedPassword()} />
                                <hr />
                                <h2>{propLabels.personalInfo}</h2>
                                {userDetails && <FullProfileForm showName={true} showCheckbox={true} userDetails={userDetails} />}
                                <hr />
                                <h2>{propLabels.profileInfo}</h2>
                                {userDetails?.id && <DeleteAccountForm userId={userDetails.id} />}
                            </div>
                        </div>
                    </>
                }
            </div>
        </Layout>
    )
}

export default MyProfile

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

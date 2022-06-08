import React, { useState } from 'react'
import axios from 'axios'

import * as fullProfileStyles from './full-profile-form.module.scss'
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"

const FullProfileForm = ({ showName, showCheckbox, userDetails, handleButtonClick }) => {
    const { language } = useI18next()
    const [errorMessage, setErrorMessage] = useState('')
    const propLabels = {
        siteTitle: useTranslation().t('sitename'),
        firstNameLabel: useTranslation().t('fullprofileform.firstname'),
        lastNameLabel: useTranslation().t('fullprofileform.name'),
        genderLabel: useTranslation().t('fullprofileform.gender'),
        genderLabelOptionM: useTranslation().t('fullprofileform.gendermale'),
        genderLabelOptionF: useTranslation().t('fullprofileform.genderfemale'),
        genderLabelOptionZ: useTranslation().t('fullprofileform.genderneutral'),
        genderLabelOptionNull: useTranslation().t('fullprofileform.gendernull'),
        birthdayLabel: useTranslation().t('fullprofileform.birthdate'),
        phoneLabel: useTranslation().t('fullprofileform.phonenumber'),
        streetLabel: useTranslation().t('fullprofileform.street'),
        numberLabel: useTranslation().t('fullprofileform.number'),
        busLabel: useTranslation().t('fullprofileform.bus'),
        postLabel: useTranslation().t('fullprofileform.postal'),
        cityLabel: useTranslation().t('fullprofileform.city'),
        newsLetterLabel: useTranslation().t('fullprofileform.news'),
        saveProfileLabel: useTranslation().t('fullprofileform.savebutton'),
        successlabel: useTranslation().t('fullprofileform.successlabel'),
        successlabel2: useTranslation().t('fullprofileform.successlabel2'),
        errorMessageInvalidBirthdayFormat: useTranslation().t('fullprofileform.error.birthday'),
        errorMessageMissingName: useTranslation().t('fullprofileform.error.name'),
        errorMessageServiceError: useTranslation().t('fullprofileform.error.service')

    }

    // this form is also used in show user details page so sometimes userDetails is filled and others is null 
    const [lastName, setLastName] = useState(userDetails?.lastName || '')
    const [firstName, setFirstName] = useState(userDetails?.firstName || '')
    const [gender, setGender] = useState(userDetails?.gender || '')
    const [dateBirth, setDateBirth] = useState(userDetails?.dateBirth || '')
    const [phone, setPhone] = useState(userDetails?.phone || '')
    const [street, setStreet] = useState(userDetails?.street || '')
    const [nr, setNr] = useState(userDetails?.nr || '')
    const [bus, setBus] = useState(userDetails?.bus || '')
    const [post, setPost] = useState(userDetails?.post || '')
    const [city, setCity] = useState(userDetails?.city || '')
    const [news, setNews] = useState(userDetails?.news || '')

    const [profileUpdated, setProfileUpdated] = useState(false)
    const saveProfile = () => {
        setErrorMessage(null);
        if (!firstName || !lastName) { setErrorMessage(propLabels.errorMessageMissingName); return }
        if (dateBirth && !(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dateBirth))) { setErrorMessage(propLabels.errorMessageInvalidBirthdayFormat); return }

        const isBrowser = () => typeof window !== "undefined"
        const userId = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenId"))
        const csrf_token = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        const body = {
            field_accept_terms: [{ value: true }],
            field_bus: [{ value: bus }],
            field_date_of_birth: [{ value: dateBirth === '' ? null : dateBirth }],
            field_first_name: [{ value: firstName }],
            field_gender: [{ value: gender }],
            field_last_name: [{ value: lastName }],
            field_number: [{ value: nr }],
            field_phone_number: [{ value: phone }],
            field_postal_code: [{ value: post }],
            field_street: [{ value: street }],
            field_city: [{ value: city }],
            field_subscribe_fan2be_letter: [{ value: news === '' ? false : news }],
        }
        const header = { 'X-CSRF-Token': csrf_token }
        axios.patch(`${urlGgeneratedByLanguage(language)}/user/${userId}?_format=json`, body, { headers: header })
            .then(() => {
                setProfileUpdated(propLabels.successlabel)
                setTimeout(() => {
                    setProfileUpdated(propLabels.successlabel2)
                    setTimeout(() => { setProfileUpdated(null) }, 3000);
                    handleButtonClick()
                }, 5000);
            })
            .catch(() => { setErrorMessage(propLabels.errorMessageServiceError) });
    }

    return (
        <div className={fullProfileStyles.content}>

            <form>
                {
                    showName && <div className={fullProfileStyles.fullname}>
                        <div>
                            <label htmlFor='firstName'>{propLabels.firstNameLabel} <span>*</span></label>
                            <input id="firstName" type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor='name'>{propLabels.lastNameLabel} <span>*</span></label>
                            <input id="name" type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                        </div>
                    </div>
                }

                <label htmlFor='gender'>{propLabels.genderLabel}</label>
                <div className={fullProfileStyles.radios} >
                    <label htmlFor='M'><input id="M" value="1" type="radio" name="gender" checked={gender === "1"} onChange={() => setGender("1")} />{propLabels.genderLabelOptionM}</label>
                    <label htmlFor='V'><input id="F" value="2" type="radio" name="gender" checked={gender === "2"} onChange={() => setGender("2")} />{propLabels.genderLabelOptionF}</label>
                    <label htmlFor='X'><input id="X" value="3" type="radio" name="gender" checked={gender === "3"} onChange={() => setGender("3")} />{propLabels.genderLabelOptionZ}</label>
                    <label htmlFor='Z'><input id="Z" value="4" type="radio" name="gender" checked={gender === "4"} onChange={() => setGender("4")} />{propLabels.genderLabelOptionNull}</label>
                </div>

                <label htmlFor='datebirth'>{propLabels.birthdayLabel}</label>
                <input id="datebirth" type="text" value={dateBirth} onChange={(e) => { setDateBirth(e.target.value) }} />

                <label htmlFor='phone'>{propLabels.phoneLabel}</label>
                <input id="phone" type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />

                <div className={fullProfileStyles.address} >
                    <div>
                        <label htmlFor='street'>{propLabels.streetLabel}</label>
                        <input id="street" type="text" value={street} onChange={(e) => { setStreet(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor='number'>{propLabels.numberLabel}</label>
                        <input id="number" type="text" value={nr} onChange={(e) => { setNr(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor='bus'>{propLabels.busLabel}</label>
                        <input id="bus" type="text" value={bus} onChange={(e) => { setBus(e.target.value) }} />
                    </div>
                </div>

                <div className={fullProfileStyles.postal} >
                    <div>
                        <label htmlFor='post'>{propLabels.postLabel}</label>
                        <input id="post" type="text" value={post} onChange={(e) => { setPost(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor='city'>{propLabels.cityLabel}</label>
                        <input id="city" type="text" value={city} onChange={(e) => { setCity(e.target.value) }} />
                    </div>
                </div>


                {showCheckbox &&
                    <div className={fullProfileStyles.checkboxWrapper}>
                        <div className={fullProfileStyles.checkbox}>
                            <input id="newsletter" type="checkbox" checked={news} value={news} onChange={() => { setNews(!news) }} />
                            <label htmlFor='newsletter'>{propLabels.newsLetterLabel}</label>
                        </div>

                        {errorMessage && <span className={fullProfileStyles.errorText} >{errorMessage}</span>}
                        {profileUpdated &&
                            <div className={`green-button ${fullProfileStyles.button}`} onClick={() => { saveProfile() }}>
                                <span>{profileUpdated}</span>
                            </div>
                        }
                        {!profileUpdated &&
                            <div className={`green-button ${fullProfileStyles.button}`} onClick={() => { saveProfile() }}>
                                <span>{propLabels.saveProfileLabel}</span>
                            </div>
                        }
                    </div>
                }

                {!showCheckbox && errorMessage && <span className={fullProfileStyles.errorText} >{errorMessage}</span>}
                {!showCheckbox && profileUpdated &&
                    <div className={`green-button ${fullProfileStyles.button}`} onClick={() => { saveProfile() }}>
                        <span>{profileUpdated}</span>
                    </div>
                }
                {!showCheckbox && !profileUpdated &&
                    <div className={`green-button ${fullProfileStyles.button}`} onClick={() => { saveProfile(); }}>
                        <span>{propLabels.saveProfileLabel}</span>
                    </div>
                }

            </form>
        </div>
    )
}

export default FullProfileForm

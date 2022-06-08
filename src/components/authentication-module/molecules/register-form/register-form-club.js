import React, { useState } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import SelectSport from '../../../core-module/atoms/select-sport/select-sport'
import * as registerFormStyles from './register-form.module.scss'
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';


const RegisterFormClub = ({setSuccess}) => {
    const propLabels = {
        errorMessageInvalidUsername: useI18next().t('recoverform.errorMessageInvalidUsername'),
        errorMessageLabel: useI18next().t('registerform.errorMessageLabel'),
        errorMandatoryFieldLabel: useI18next().t('registerform.mandatoryField'),
        club_name: useI18next().t('registerform.nameOfClub'),
        presidentName: useI18next().t('registerform.clubPresident'),
        presidentEmail: useI18next().t('registerform.clubPresidentEmail'),
        emailLabelTip: useI18next().t('registerform.emailLabelTip'),
        firstName: useI18next().t('registerform.firstNameLabel'),
        lastName: useI18next().t('registerform.lastNameLabel'),
        sport: useI18next().t('registerform.sport'),
        street: useI18next().t('fullprofileform.street'),
        numberLabel: useI18next().t('fullprofileform.number'),
        busLabel: useI18next().t('fullprofileform.bus'),
        postalCode: useI18next().t('fullprofileform.postal'),
        city: useI18next().t('fullprofileform.city'),
        phone: useI18next().t('fullprofileform.phonenumber'),
        email: useI18next().t('registerform.emailLabel'),
        knowledgeTerm: useI18next().t('registerform.termsLabel6'),
        confirmationTerm: useI18next().t('registerform.confirmationTerm'),
        confirmationTerm2: useI18next().t('registerform.confirmationTerm2'),
        privateTerm: useI18next().t('registerform.termsLabel2'),
        andTerm: useI18next().t('registerform.termsLabel3'),
        legalTerm: useI18next().t('registerform.termsLabel4'),
        okButtonLabel: useI18next().t('registerform.okButtonLabel1'),
        serviceError: useI18next().t('http.serverError')
    }

    const [inputs, setInputs] = useState({
        club_name: '',
        presidentName: '',
        presidentEmail: '',
        firstName: '',
        lastName: '',
        street: '',
        phone: '',
        email: '',
        terms: false,
        terms2: false,
        postalCode: '',
        city: '',
        bus: '',
        number: ''
    })

    const [sport, setSport] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const isFilled = (field) => (inputs[field] !== '')

    const validatePhoneNumber = (phone) => phone.length >= 8 && phone.length <= 10;

    const performRegister = () => {
        if (!(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email))) { setErrorMessage(propLabels.errorMessageInvalidUsername); return }
        if (!inputs.terms || !inputs.terms2) { setErrorMessage(propLabels.errorMessageLabel);  return }
        if (!inputs.terms || !inputs.terms2) { setErrorMessage(propLabels.errorMessageLabel);  return }
        const mandatoryFields = ['club_name', 'presidentName', 'firstName', 'lastName', 'presidentEmail', 'street', 'email', 'postalCode', 'city', 'phone']
        const emptyFields = mandatoryFields.filter(field => {
            let result = inputs[field] == ''
            return result
        })

        if(!validatePhoneNumber(inputs.phone)) {
            emptyFields.push('phone')
        }
        
        if(sport.length === 0) {
            emptyFields.push('sport')
        }
        setErrorMessage('')
        if(emptyFields.length > 0) {
            setErrorMessage(propLabels.errorMandatoryFieldLabel+' '+emptyFields.map(field => propLabels[field]).join(', '))
            return
        }

        const request = {
            user_details: {
                mail: [{ value: inputs.email}],
                name: [{ value: inputs.email}],
                roles: ["club_owners"],
                status: [{ value: false }],
                timezone: [{ value: "Europe/Brussels" }],
                preferred_langcode: [{ value: "en" }],
                field_accept_terms: [{ value: inputs.terms }],
                field_subscribe_fan2be_letter: [{value: false }],
                field_create_club_free_cost: [{value: true }],
                field_self_club_creation: [{value: true }], 
                field_phone_number: [{value: inputs.phone}],
                field_street: [{value: inputs.street}],
                field_postal_code: [{value: inputs.postalCode}],
                field_city: [{value: inputs.city }],
                field_last_name: [{value: inputs.lastName}],
                field_first_name: [{value: inputs.firstName}],
                field_bus: [{value: inputs.bus}],
                field_number: [{value: inputs.number}]
            },
            club_name: inputs.club_name,
            club_president_name: inputs.presidentName,
            club_president_email: inputs.presidentEmail,
            sports: sport.map(s => ({id: s.value})),
        }

        const header = { 'Content-Type': 'application/json' }

        axios.defaults.withCredentials = false
        axios.post(`${process.env.GATSBY_API_URL}/api/create-club?_format=json`, request, {headers: header})
            .then((response) => {
                if(response.data.status !== 200) {
                    throw response.data.data
                }
                if(response) {
                    setSuccess(true)
                }
            })
            .catch(error => {
                let err = propLabels.serviceError
                if(typeof error === 'string') {
                    err = error
                }
                setErrorMessage(err)
            })
    }

    const handleInputChange = (event, value = null) => {
        const finalValue = value !== null ? value : event.target.value
        setInputs({...inputs, [event.target.name]: finalValue});
    }

    const isComplete = () => {
        return (inputs.email !== '' && inputs.terms && inputs.terms2)
    }

    return (
            <form className={registerFormStyles.formClub}>
                <div className={registerFormStyles.formSections}>
                    <div className={registerFormStyles.section}>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='nameOfTheClub' >{propLabels.club_name}<span> *</span></label>
                            <input id="nameOfTheClub" type="text" name="club_name" onChange={handleInputChange} />
                        </div>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='sport' >{propLabels.sport}<span> *</span></label>
                            <SelectSport setSport={setSport}/>
                        </div>
                    </div>

                    <div className={registerFormStyles.section}>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='clubPresident' >{propLabels.presidentName}<span> *</span></label>
                            <input id="clubPresident" type="text" name="presidentName" onChange={handleInputChange} />
                        </div>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='presidentEmail' >{propLabels.presidentEmail}<span> *</span></label>
                            <input id="presidentEmail" type="email" name="presidentEmail" onChange={handleInputChange} />
                        </div>
                    </div>
                    
                    <div className={registerFormStyles.section}>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='firstName' >{propLabels.firstName}<span> *</span></label>
                            <input id="firstName" type="text" name="firstName" onChange={handleInputChange} />
                        </div>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='lastName' >{propLabels.lastName}<span> *</span></label>
                            <input id="lastName" type="text" name="lastName" onChange={handleInputChange} />
                        </div>
                    </div>
                    
                    <div className={registerFormStyles.section}>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='email' >{propLabels.email}<span> *</span> <span className={registerFormStyles.tip}>{propLabels.emailLabelTip}</span></label>
                            <input id="email" type="email" name="email" onChange={handleInputChange} />
                        </div>

                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='street' >{propLabels.street}<span> *</span></label>
                            <input id="street" type="text" name="street" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className={registerFormStyles.section}>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='number' >{propLabels.numberLabel}</label>
                            <input id="number" type="text" name="number"  onChange={handleInputChange} />
                        </div>

                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='bus' >{propLabels.busLabel}</label>
                            <input id="bus" type="number" name="bus" onChange={handleInputChange} />
                        </div>
                    </div>
                    
                    <div className={registerFormStyles.section}>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='city' >{propLabels.city}<span> *</span></label>
                            <input id="city" type="text" name="city"  onChange={handleInputChange} />
                        </div>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='postalCode' >{propLabels.postalCode}<span> *</span></label>
                            <input id="postalCode" type="text" name="postalCode"  onChange={handleInputChange} />
                        </div>
                    </div>
                    
                    <div className={registerFormStyles.section}>
                        <div className={`${registerFormStyles.fields}`}>
                            <label htmlFor='phone' >{propLabels.phone}<span> *</span></label>
                            <input id="phone" type="number" name="phone"  onChange={handleInputChange} />
                        </div>

                        <div className={`${registerFormStyles.emptyBox}`}>
                        </div>
                    </div>
                    
                    <div className={registerFormStyles.section}>
                        <div className={`${registerFormStyles.fields}`} >
                            <div className={registerFormStyles.conditions}>
                                <input type="checkbox" id="newsletter" className={registerFormStyles.terms}  name="terms2" onChange={(e) => { handleInputChange(e, !inputs.terms2)}} />
                                <label htmlFor="newsletter">{propLabels.knowledgeTerm}</label>
                            </div>
                        </div>

                        <div className={`${registerFormStyles.fields}`} >
                            <div className={registerFormStyles.conditions}>
                                <input type="checkbox" id="terms" className={registerFormStyles.terms} name="terms"  onChange={(e) => { handleInputChange(e, !inputs.terms)}} />
                                <label htmlFor="terms">{propLabels.termsLabel1}
                                    {propLabels.confirmationTerm}  
                                    <Link to={'/company/privacy'} className={registerFormStyles.linkTerms}><span> {propLabels.privateTerm} </span></Link> 
                                    {propLabels.andTerm}
                                    <Link to={'/company/legal'} className={registerFormStyles.linkTerms}><span> {propLabels.legalTerm} </span></Link>
                                    {propLabels.confirmationTerm2}  
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={registerFormStyles.errorBox}>
                    {<span className={`red-text ${registerFormStyles.errorMessage}`}>{errorMessage}</span>}
                </div>

                <div className={registerFormStyles.formSections}>
                    <div className={`${registerFormStyles.submit} ${registerFormStyles.submitClub}`}>
                        <div className={`${registerFormStyles.links} ${isComplete() ? 'green-button' : 'disabled-button'} `}
                           onClick={performRegister}>
                            <span>{propLabels.okButtonLabel}</span>
                        </div>
                    </div>
                </div>
            </form>
    )
}

export default RegisterFormClub;
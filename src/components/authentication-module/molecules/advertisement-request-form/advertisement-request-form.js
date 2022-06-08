import React, { useState } from 'react'
import axios from 'axios'
import * as style from './advertisement-request-form.module.scss'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'
import SelectSport from '../../../core-module/atoms/select-sport/select-sport'
import { urlGgeneratedByLanguage } from "../../../../utils/utils"
import { navigate } from 'gatsby'

const AdvertisementRequestForm = () => {
    const { language } = useI18next()
    const [showView , setView] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [sport, setSport] = useState([])
    const translation = useTranslation()
    const [inputs, setInputs] = useState({
        name: '',
        companyName: '',
        function: '',
        email: '',
        address: '',
        number: '',
        postalCode: '',
        vatNumber: '',
        phone: '',
        adsValue:'',
        adsType: [],
        adsValueString: '',
        bus: '',
        adsPerDay: ''
    })

    const isComplete = () => {
        return ( 
            (inputs.name !== '' &&  inputs.name !== undefined &&  inputs.name !== null) && 
            (inputs.email !== '' && inputs.email !== undefined && inputs.email !== null) && 
            (inputs.companyName !== '' && inputs.companyName !== undefined && inputs.companyName !== null) && 
            (inputs.function !== '' && inputs.function !== undefined && inputs.function !== null ) && 
            (inputs.address !== '' && inputs.address !== undefined && inputs.address !== null ) && 
            (inputs.phone !== '' && inputs.phone !== undefined && inputs.phone !== null ) &&
            (inputs.bus !== '' && inputs.bus !== undefined && inputs.bus !== null ) &&
            (inputs.postalCode !== '' && inputs.postalCode !== undefined && inputs.postalCode !== null ) &&
            (inputs.number !== '' && inputs.number !== undefined && inputs.number !== null)  &&
            (inputs.adsValue !== '' && inputs.adsValue !== undefined && inputs.adsValue !== null)  &&
            (inputs.adsPerDay !== '' && inputs.adsPerDay !== undefined && inputs.adsPerDay !== null)  
        )
    }

    const handleInputChange = (event, value = null) => {
        const finalValue = value !== null ? value : event.target.value
        

        if (event.target.name === 'adsType') {
            if (event.target.checked) {
                setInputs({
                    ...inputs, adsType:  [...inputs.adsType, parseInt(finalValue)]
                });
              } else {
                setInputs({
                    ...inputs, adsType: inputs.adsType.filter((e) => parseInt(e) !== parseInt(event.target.value)),
                });
              }
              setErrorMessage()
        } else {
            setInputs({...inputs, [event.target.name]:  finalValue})
            setErrorMessage()
        }
       
    }

    const clearForm = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => {  input.value = ''; input.checked = false }
        );
    }

    const submitAds = () => {

        if (!(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email))) { setErrorMessage(translation.t('advertisement.errorMsg.email')); return }
        if (inputs.adsPerDay < 50 || inputs.adsPerDay === '') { setErrorMessage(translation.t('advertisement.errorMsg.minnimum')); return }
        if (inputs.adsValue  === 'other' && inputs.adsValueString === '') { setErrorMessage(translation.t('advertisement.errorMsg.other')); return }
        if (!isComplete()) { setErrorMessage(translation.t('advertisement.errorMsg.mandatoryField')); return }
        

        let sportsIds =  sport.map(function (el) { return {id: el.value}; });
        let request = {
            "field_advertiser_name": inputs.name,
            "field_company_name":  inputs.companyName,
            "field_advertiser_email": inputs.email,
            "field_function": inputs.function,
            "field_address": inputs.address,
            "field_number": inputs.number,
            "field_phone": inputs.phone,
            "field_postal_code": inputs.postalCode,
            "field_btw_number":inputs.vatNumber,
            "field_amount_spent_per_day": inputs.adsPerDay,
            "field_budget": inputs.adsValue === "other" ? 0 : inputs.adsValue,
            "field_adds_format":inputs.adsType,
            "field_other_budget": inputs.adsValue === "other" ? inputs.adsValueString : null,
            "field_adds_related_sports": sportsIds            
        }


        const header = { 'Content-Type': 'application/json' }
   
        axios.defaults.withCredentials = false
        axios.post(`${urlGgeneratedByLanguage(language)}/api/create-advertisements`, request, {headers: header})
            .then((response) => {
                if(response.data.status !== 200) {
                    throw response.data.data
                }

                if(response) {
                    clearForm();
                    setInputs({
                        name: '',
                        companyName: '',
                        function: '',
                        email: '',
                        address: '',
                        number: '',
                        postalCode: '',
                        vatNumber: '',
                        phone: '',
                        adsValue:'',
                        adsType: [],
                        adsValueString: '',
                        bus: '',
                        adsPerDay: ''
                    })  
                    setSport([])
                    setView(true)              
                }
            })
            .catch(error => { setErrorMessage(error.response.data.message) }) 
    }

    const successView = () => {
        return (
            <div  className={style.success_view}>
                
                <div className={style.text}>
                    <span>{translation.t('advertisement.thankYou')}</span>
                </div>

                <div className={style.btn_container}>
                    <div className={style.formSections}>
                        <div className={`${style.submit} ${style.submitClub}`}>
                            <div className={`${style.links} ${ 'green-button'} `}
                            onClick={() => { 
                                setView(false) 
                                }}>
                                <span>{translation.t('advertisement.register')}</span>
                            </div>
                        </div>
                    </div>
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


    const formView = () => {
     return(
        <div className={style.advertisementForm} >
            <form className={style.ads_form}>
                <div className={style.formSections}>
                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='name' >{translation.t('advertisement.name')}<span> *</span></label>
                            <input id="name" type="text" name="name" onChange={handleInputChange} />
                        </div>
                        <div className={`${style.fields}`}>
                            <label htmlFor='companyName' >{translation.t('advertisement.companyName')}<span> *</span></label>
                            <input id="companyName" type="text" name="companyName" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='function' >{translation.t('advertisement.function')}<span> *</span></label>
                            <input id="function" type="text" name="function" onChange={handleInputChange} />
                        </div>
                        <div className={`${style.fields}`}>
                            <label htmlFor='email' >{translation.t('advertisement.email')}<span> *</span></label>
                            <input id="email" type="email" name="email" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='address' >{translation.t('advertisement.address')}<span> *</span></label>
                            <input id="address" type="text" name="address" onChange={handleInputChange} />
                        </div>
                        <div className={`${style.fields}`}>
                            <label htmlFor='number' >Bus<span> *</span></label>
                            <input id="bus" type="text" name="bus" onChange={handleInputChange} />
                        </div>
                
                    </div>

                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='number' >{translation.t('advertisement.number')}<span> *</span></label>
                            <input id="number" type="number" name="number" onChange={handleInputChange} />
                        </div>
                        
                        <div className={`${style.fields}`}>
                            <label htmlFor='postalCode' >{translation.t('advertisement.postalCode')}<span> *</span></label>
                            <input id="postalCode" type="text" name="postalCode" onChange={handleInputChange} />
                        </div>
                        
                    </div>

                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='vatNumber' >{translation.t('advertisement.vatNumber')}<span> </span></label>
                            <input id="vatNumber" type="text" name="vatNumber" onChange={handleInputChange} />
                        </div>

                        <div className={`${style.fields}`}>
                            <label htmlFor='phone' >{translation.t('advertisement.phone')}<span> *</span></label>
                            <input id="phone" type="number" name="phone"  onChange={handleInputChange} />
                        </div>

                    
                    </div>

                    <div className={style.divider}>
                        <hr className={style.solid}/>  
                    </div>


                    <div className={style.section}>
                        <span className={`${style.title}`}>{translation.t('advertisement.adsInformation')}</span>    
                    </div>

                    <div className={`${style.section} ${style.align_left}`}>
                        
                        
                        <label><span className={`${style.subTitle}`}>{translation.t('advertisement.budget')}<span className={style.mandatory}>*</span><span className={style.tip}>{translation.t('advertisement.intentedAmount')}</span></span>  </label>
                    </div>

                    <div className={style.section}>
                        
                        <div className={`${style.radios}`}>
                            <label htmlFor='M'><input id="M" value="500" type="radio" name="adsValue"  onChange={handleInputChange} />500€</label>
                        
                        </div> 

                        <div className={`${style.radios}`}>
                            <label htmlFor='V'><input id="F" value="1000" type="radio" name="adsValue"  onChange={handleInputChange} />1000€</label>                            
                        </div> 

                        <div className={`${style.radios}`}>
                            <label htmlFor='X'><input id="X" value="1500" type="radio" name="adsValue"  onChange={handleInputChange} />1500€</label>                            
                        </div> 

                        <div className={`${style.radios}`}>                            
                            <label htmlFor='Z'><input id="Z" value="2000" type="radio" name="adsValue"  onChange={handleInputChange} />2000€</label>
                        </div> 

                        <div className={`${style.radios}`}>        
                            <label htmlFor='Z'><input id="Z" value="other" type="radio" name="adsValue"  onChange={handleInputChange} />{translation.t('advertisement.other')} <input className={style.other} name="adsValueString" type="text" onChange={handleInputChange}/></label>
                        </div> 


                    </div>

                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='adsPerDay' >{translation.t('advertisement.amountSpentPerDay')}<span> *</span> <span className={style.tip}>{translation.t('advertisement.minimumLabel')}</span></label>
                            <input id="adsPerDay" type="number" name="adsPerDay" onChange={handleInputChange} />
                        </div>
                        <div className={`${style.fields}`}>
                            <label htmlFor='sport' >{translation.t('advertisement.sportRelated')}<span> </span> <span className={style.tip}></span></label>
                            <SelectSport setSport={setSport}/>
                        </div>
                    </div>

                    <div className={style.divider}>
                        <hr className={style.solid}/>  
                    </div>

                    <div className={style.section}>
                        <span className={`${style.title}`}>{translation.t('advertisement.advertisingFormats')}</span>    
                    </div>  

                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <span className={`${style.subTitle}`}>PC</span>
                            <div className={style.radio_container}>
                                <input id="M" value="1" type="checkbox" name="adsType" onChange={handleInputChange} />
                                <span className={style.radio_label}>{translation.t('advertisement.advertisingFormats.largeRectangle')} (336x280)</span>

                                <div>
                                    <span>30€/DV</span>
                                </div>                                
                            </div> 
                            <div className={style.radio_container}>
                                <input id="M" value="2" type="checkbox" name="adsType" onChange={handleInputChange} />
                                <span className={style.radio_label}>{translation.t('advertisement.advertisingFormats.halfPageOrLargeSkyscraper')} (300x600)</span>

                                <div>
                                    <span>30€/DV</span>
                                </div>                                
                            </div> 
                            <div className={style.radio_container}>
                                <input id="M" value="3" type="checkbox" name="adsType"  onChange={handleInputChange} />
                                <span className={style.radio_label}>{translation.t('advertisement.advertisingFormats.leaderBoardOnTop')} (768x90)</span>

                                <div>
                                    <span>30€/DV</span>
                                </div>                               
                            </div> 
                        </div> 
                
                    </div>

                    <div className={`${style.section} ${style.info}`}>
                        <div className={`${style.fields}`}>
                            <span className={`${style.subTitle}`}>{translation.t('advertisement.tarief.div')}</span>
                            
                        </div> 
                        <div className={`${style.fields}`}>
                            <span className={`${style.subTitle}`}>{translation.t('advertisement.tarief.clicks')}</span>
                            
                            
                        </div> 
                        <div className={`${style.fields}`}>
                            <span className={`${style.subTitle}`}>{translation.t('advertisement.tarief.animated')}</span>
                            
                        </div> 
                    </div>

                </div>
                <div className={style.errorBox}>
                    {<span className={`red-text ${style.errorMessage}`}>{errorMessage}</span>}
                </div>

                <div className={style.formSections}>
                    <div className={`${style.submit} ${style.submitClub}`}>
                        <div className={`${style.links} ${isComplete() ? 'green-button' : 'disabled-button'} `}
                        onClick={submitAds}>
                            <span>{translation.t('advertisement.register')}</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
     )
    }
 

    
    return (
        !showView ? formView() : successView()
    )
}


export default AdvertisementRequestForm
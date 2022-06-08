import React, { useState } from 'react'
import axios from 'axios'
import { graphql } from 'gatsby'
import * as style from './colson-form-request.module.scss'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'
import { urlGgeneratedByLanguage } from "../../../../utils/utils"
import SuccessView from './success-view'

const ColsonFormRequest = ({setSuccess}) => {
    const { language } = useI18next()
    const [showView , setView] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const translation = useTranslation().t
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        address: '',
        lastName: '',
        number: '',
        postalCode: '',
        bus: '',
        city: '',
        topics: []
    })

    const isComplete = () => {
        return ( 
            (inputs.name !== '' &&  inputs.name !== undefined &&  inputs.name !== null) && 
            (inputs.email !== '' && inputs.email !== undefined && inputs.email !== null) && 
            (inputs.address !== '' && inputs.address !== undefined && inputs.address !== null ) && 
            (inputs.city !== '' && inputs.city !== undefined && inputs.city !== null ) && 
            (inputs.postalCode !== '' && inputs.postalCode !== undefined && inputs.postalCode !== null)  &&
            (inputs.number !== '' && inputs.number !== undefined && inputs.number !== null)  &&
            (inputs.bus !== '' && inputs.bus !== undefined && inputs.bus !== null)  &&
            (inputs.topics !== '' && inputs.topics !== undefined && inputs.topics !== null && inputs.topics.length >= 1)  
        )
    }

    const handleInputChange = (event, value = null) => {
        const finalValue = value !== null ? value : event.target.value
        
        if (event.target.name === 'topics') {
            if (event.target.checked) {
                setInputs({
                    ...inputs, topics:  [...inputs.topics, parseInt(finalValue)]
                });
              } else {
                setInputs({
                    ...inputs, topics: inputs.topics.filter((e) => parseInt(e) !== parseInt(event.target.value)),
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

    const submitColson = () => {

        if (!(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email))) { setErrorMessage(translation('advertisement.errorMsg.email')); return }
        if (!isComplete()) { setErrorMessage(translation('advertisement.errorMsg.mandatoryField')); return }
        

        let request = {
            "firtname": inputs.name,
            "lastname": inputs.lastName,
            "email": inputs.email,
            "address": inputs.address,
            "number": inputs.number,
            "bus": inputs.bus,
            "city": inputs.city,
            "postlcode":inputs.postalCode,
            "topics": inputs.topics,
        }


        const header = { 'Content-Type': 'application/json' }
   
        axios.defaults.withCredentials = false
        axios.post(`${urlGgeneratedByLanguage(language)}/api/custom-advertisements`, request, {headers: header})
            .then((response) => {
                if(response.data.status !== 200) {
                    throw response.data.data
                }

                if(response) {
                    clearForm();
                    setInputs({
                        name: '',
                        email: '',
                        address: '',
                        lastName: '',
                        number: '',
                        postalCode: '',
                        city: '',
                        bus: '',
                        topics: []
                    })  
                    setView(true)
                    setSuccess(true)             
                }
            })
            .catch(error => { setErrorMessage(error.response); console.log(error) }) 
    }

    const formView = () => {
     return(
        <div className={style.advertisementForm} >
            <form className={style.ads_form}>
                <div className={style.formSections}>
                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='name' >{translation('colson.form.firstname')}<span> *</span></label>
                            <input id="name" type="text" name="name" onChange={handleInputChange} />
                        </div>
                        <div className={`${style.fields}`}>
                            <label htmlFor='lastName' >{translation('colson.form.lastname')}<span></span></label>
                            <input id="lastName" type="text" name="lastName" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='email' >{translation('colson.form.email')}<span> *</span></label>
                            <input id="email" type="email" name="email" onChange={handleInputChange} />
                        </div>
                        <div className={`${style.fields}`}>
                            <label htmlFor='address' >{translation('colson.form.street')}<span> *</span></label>
                            <input id="address" type="text" name="address" onChange={handleInputChange} />
                        </div>
                    </div>


                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='number' >{translation('colson.form.number')}<span> *</span></label>
                            <input id="number" type="number" name="number" onChange={handleInputChange} />
                        </div>
                        <div className={`${style.fields}`}>
                            <label htmlFor='number' >{translation('colson.form.bus')}<span> *</span></label>
                            <input id="bus" type="text" name="bus" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className={style.section}>
                        <div className={`${style.fields}`}>
                            <label htmlFor='city' >{translation('colson.form.city')}<span> *</span></label>
                            <input id="city" type="text" name="city" onChange={handleInputChange} />
                        </div>
                        
                        <div className={`${style.fields}`}>
                            <label htmlFor='postalCode' >{translation('colson.form.postcode')}<span> *</span></label>
                            <input id="postalCode" type="text" name="postalCode" onChange={handleInputChange} />
                        </div>
                        
                    </div>

                    <div className={style.divider}>
                        <hr className={style.solid}/>  
                    </div>

                    <div className={style.section}>
                        <span className={`${style.title}`}>{translation('colson.contactReason')}</span>    
                    </div>  


                    <div className={style.section}>
                        <div className={`${style.selectOptions} w-100`}>
                            <div className={style.radio_container}>
                                <input id="M" value="1" type="checkbox" name="topics" onChange={handleInputChange} />
                                <span className={style.radio_label}>{translation('colson.option.sportsInsurance')}</span>                           
                            </div> 
                            <div className={style.radio_container}>
                                <input id="M" value="2" type="checkbox" name="topics" onChange={handleInputChange} />
                                <span className={style.radio_label}>{translation('colson.option.insurance')}</span>
                            </div>
                        </div> 
                    </div>

                </div>
                <div className={style.errorBox}>
                    {<span className={`red-text ${style.errorMessage}`}>{errorMessage}</span>}
                </div>

                <div className={style.formSections}>
                    <div className={`${style.submit} ${style.submitClub}`}>
                        <div className={`${style.links} ${isComplete() ? 'green-button' : 'disabled-button'} `}
                        onClick={submitColson}>
                            <span>{translation('advertisement.register')}</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
     )
    }
 

    
    return (
        !showView ? formView() : <SuccessView setView={setView}/>
    )
}


export default ColsonFormRequest

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
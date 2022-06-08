import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as firstLikesForm from './first-likes-form.module.scss'
import FirstLikesItem from '../first-likes-item/first-likes-item'
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"

/**
 * Entity type : 
 * {"title": string,"nid": string,"logo": string}
 * @returns 
 */
const FirstLikesForm = () => {

    const [entities, setEntities] = useState([])
    const [filter, setFilter] = useState('');
    const { language } = useI18next()

    const propLabels = {
        label: useTranslation().t('firstlikesform.label'),
        submit: useTranslation().t('firstlikesform.buttontext')
    }

    useEffect(() => {
        const isBrowser = () => typeof window !== "undefined"
        const csrf_token = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        const header = { 'X-CSRF-Token': csrf_token }
        axios.get(`${urlGgeneratedByLanguage(language)}/api/area-of-interests`, { headers: header }).then((response) => {
            setEntities(response.data)
        })
    }, [language])

    const submitChange = () => {
        const isBrowser = () => typeof window !== "undefined"
        const userId = isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenId"))
        if (!userId) return
        const body = { field_first_login: [{ value: false }] }
        const csrf_token = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        const header = { 'X-CSRF-Token': csrf_token }

        axios.patch(`${urlGgeneratedByLanguage(language)}/user/${userId}?_format=json`, body, { headers: header })
            .then(() => { navigate("/", { replace: true }) })
            .catch(() => { navigate("/", { replace: true }) })
    }

    return (
        <div className={firstLikesForm.form}>
            <form>
                <label>{propLabels.label}</label>
                <div className={firstLikesForm.searchBar}>
                    <input type="text" id="filter" name="filter" value={filter} onChange={event => setFilter(event.target.value)} />
                    <div className={firstLikesForm.searchButton}>
                        <FontAwesomeIcon icon={'search'} size="lg" />
                    </div>
                </div>
            </form>
            <div className={firstLikesForm.results}>
                {
                    entities?.filter(entity => entity.title.toLowerCase().includes(filter.toLowerCase()) && filter !== '')
                        .map((entity, index) => (
                            <div key={`navItem__${index}`} className={`${firstLikesForm.entity}`}>
                                <FirstLikesItem imgurl={`${entity.logo}`} name={entity.title} interestId={entity.nid} showLike={true} />
                            </div>
                        ))
                }
            </div>
            <div className={firstLikesForm.buttonwrapper} onClick={() => { submitChange() }}>
                <div className={`green-button ${firstLikesForm.button}`}>
                    {propLabels.submit}
                </div>
            </div>
        </div>
    )
}

export default FirstLikesForm

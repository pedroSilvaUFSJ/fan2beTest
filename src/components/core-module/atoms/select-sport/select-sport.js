import React, { useEffect, useState } from 'react'
import * as selectSportStyle from './select-sport.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MultiSelect } from "react-multi-select-component";
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"
import axios from 'axios'


const SelectSport = ({setSport}) => {

    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);
    const { language } = useI18next()
    const translation = useTranslation()

    const sortByLabel = (list) => (list.sort((a,b) => {
        const nameA = a.label.toUpperCase();
        const nameB = b.label.toUpperCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    }))

    useEffect(() => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/sports?_format=json`).then(result => {
            const allOptions = result.data.map(item => ({value: item.id,label: item.title}))
            setOptions(sortByLabel(allOptions))
        }).catch(error => setOptions([]))
    }, [setOptions])

    const selectHandler = (values) => {
        setSelected(values)
        setSport(values);
    }

    return (
        <div className={`selectInput ${selectSportStyle.selectInput}`}>
            <FontAwesomeIcon icon="basketball-ball" color='#00A988'/>
            <MultiSelect
                options={options}
                className={selectSportStyle.multiselect}
                value={selected}
                onChange={selectHandler}
                overrideStrings={{
                    "allItemsAreSelected": translation.t('dropdown.allItemsAreSelected'),
                    "clearSearch": translation.t('dropdown.clearSearch'),
                    "clearSelected": translation.t('dropdown.clearSelected'),
                    "noOptions": translation.t('dropdown.noOptions'),
                    "search": translation.t('dropdown.search'),
                    "selectAll": translation.t('dropdown.selectAll'),
                    "selectAllFiltered": translation.t('dropdown.selectAllFiltered'),
                    "selectSomeItems": translation.t('dropdown.selectSomeItems'),
                    "create": translation.t('dropdown.create'),
                }}
            />
        </div>
    )

}

export default SelectSport
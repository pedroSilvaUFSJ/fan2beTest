import React, { useState } from 'react'
import { Link } from 'gatsby'

import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navigate } from 'gatsby'

import * as  searchBarStyles from './search-bar.module.scss'
import { useTranslation } from 'gatsby-plugin-react-i18next';

const SearchBar = ({ className }) => {
    const [searchTag, setSearchTag] = useState('')
    const placeholderLabel = useTranslation().t('header.search.placeholder')

    const clickSearch = () => {
        if (!searchTag) return
        navigate(`/main/search?tag=${searchTag}`, { replace: true })
    }

    return (
        <div className={`${className === 'extrapadding' ? `${searchBarStyles.extrapadding}` : ''} ${searchBarStyles.content}`}>
            <div className={`${searchBarStyles.border}`}>
                <input className={searchBarStyles.inputSearch} placeholder={placeholderLabel} onChange={(e) => setSearchTag(e.target.value)} onKeyDown={(e) => { if (e.code === 'Enter') clickSearch() }}/>
                <button className={searchBarStyles.searchButton} onClick={() => clickSearch()}>
                    <FontAwesomeIcon icon={'search'} size="lg" />
                </button>
            </div>
        </div>
    )
}

SearchBar.propTypes = {
    className: PropTypes.string
}

export default SearchBar
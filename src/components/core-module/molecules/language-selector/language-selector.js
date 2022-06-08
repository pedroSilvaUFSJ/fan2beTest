import React from 'react';
import * as languageSelectorStyles from './language-selector.module.scss'
import globe from '../../../../images/globe.svg'
import { Link, useI18next } from 'gatsby-plugin-react-i18next';

const LanguageSelector = () => {
    const { languages, originalPath, language } = useI18next();

    const isBrowser = () => typeof window !== "undefined"
    const queryString = isBrowser() && window ? window.location.search : ''

    const languageList = {
        nl: { id: 0, label: 'Nederlands' },
        en: { id: 1, label: 'English' },
    }

    return (
        <div className={languageSelectorStyles.sectionLanguages} >
            {languages.map((lng) => (
                <div key={lng} className={`${lng === language ? `${languageSelectorStyles.active}` : ''}`}>
                    {/* <Link to={`${originalPath}${queryString}`} language={lng}>
                        <img alt='active language selector' src={globe} />
                        <span>{languageList[lng].label}</span>
                    </Link> */}
                </div>
            ))}
        </div>
    )
}
export default LanguageSelector
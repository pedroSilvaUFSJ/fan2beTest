
import React from 'react'
import { Link } from 'gatsby'

import * as  footerAboutUsNoteStyles from './footer-about-us-note.module.scss'
import { useTranslation } from 'gatsby-plugin-react-i18next';

const FooterAboutUseNote = () => {
    const propLabels = {
        aboutus: useTranslation().t('footer.aboutus'),
        collaborate: useTranslation().t('footer.colaborate'),
        jobs: useTranslation().t('footer.jobs'),
        contact: useTranslation().t('footer.contact')
    }
    return (
        <div className={`${footerAboutUsNoteStyles.bottom}`}>
            <Link to={'/company/about-us'}><span>{propLabels.aboutus}</span></Link>
            <Link to={'/company/collaborate'}><span>{propLabels.collaborate}</span></Link>
            <Link to={'/company/jobs'}><span>{propLabels.jobs}</span></Link>
            <Link to={'/company/contact'}><span>{propLabels.contact}</span></Link>
        </div>

    )
}

export default FooterAboutUseNote

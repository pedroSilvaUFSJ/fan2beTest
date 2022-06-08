import React from 'react'
import { Link } from 'gatsby'

import * as  footerPrivacyLegalNoteStyles from './footer-privacy-legal-note.module.scss'
import { useTranslation } from 'gatsby-plugin-react-i18next';

const FooterPrivacyLegalNote = ({ whiteTextClass }) => {
    const propLabels = {
        privacy: useTranslation().t('footer.privacy'),
        legal: useTranslation().t('footer.legal'),
        cookies: useTranslation().t('footer.cookies'),
    }
    return (
        <div className={`${footerPrivacyLegalNoteStyles.bottom}`}>
            <span className={`${footerPrivacyLegalNoteStyles.gray}`}>© Fan2Be </span>
            <Link to={'/company/privacy'}><span className={`${whiteTextClass ? whiteTextClass : ''}`}>{propLabels.privacy} </span></Link>
            <Link to={'/company/legal'}><span className={`${whiteTextClass ? whiteTextClass : ''}`}>{propLabels.legal}</span></Link>
            <Link to={'/company/cookies'}><span className={`${whiteTextClass ? whiteTextClass : ''}`}>{propLabels.cookies}</span></Link>
        </div>
    )
}
export default FooterPrivacyLegalNote
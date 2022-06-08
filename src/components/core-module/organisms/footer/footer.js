import React from 'react'

import * as footerStyles from './footer.module.scss'
import iconImage from "../../../../images/footer-icon.svg"

import LanguageSelector from '../../molecules/language-selector/language-selector'
import LogoIcon from '../../atoms/logo-icon/logo'

import FooterPrivacyLegalNote from '../../atoms/footer-privacy-legal-note/footer-privacy-legal-note'
import FooterAboutUseNote from '../../atoms/footer-about-us-note/footer-about-us-note'

const Footer = () => {

  return <>
    <footer className={`${footerStyles.content} `}>
      <div className={`container ${footerStyles.wrapper}`}>
        <div className={`${footerStyles.first}`}>
          <LogoIcon />
        </div>
        <div className={`${footerStyles.middle}`}>
          <div className={footerStyles.middle__row}>
            <LanguageSelector />
          </div>
          <div className={footerStyles.middle__row}>
            <FooterAboutUseNote />
          </div>
          <div className={`${footerStyles.middle__row}`}>
            <FooterPrivacyLegalNote />
          </div>
        </div>
        <div className={`${footerStyles.last}`}>
          <div>
            <img src={iconImage} alt="company lettering symbol" />
          </div>
        </div>
      </div>
    </footer >
  </>
}
export default Footer
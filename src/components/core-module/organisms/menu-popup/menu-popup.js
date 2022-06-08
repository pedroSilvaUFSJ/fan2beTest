import React from "react"

import * as menuPopUpStyles from './menu-popup.module.scss'

import { Link } from "gatsby"
import HamburguerButton from "../../../core-module/atoms/hamburger-button/hamburguer-button"
import SearchBar from "../../../main-page-module/atoms/search-bar/search-bar"
import LinkItem from "../../../main-page-module/atoms/link-item/link-item"
import LogoIcon from "../../atoms/logo-icon/logo"
import FooterAboutUsNote from "../../atoms/footer-about-us-note/footer-about-us-note"
import FooterPrivacyLegalNote from "../../atoms/footer-privacy-legal-note/footer-privacy-legal-note"
import LanguageSelector from "../../molecules/language-selector/language-selector"
import MenuNav from "../../molecules/menu-nav/menu-nav"

import { isUserLoggedIn } from "../../../../utils/check-user-auth"
import { useTranslation } from 'gatsby-plugin-react-i18next'

const MenuPopUp = ({ open, toggleBurgerMenu, menuItems }) => {

    const propLabels = {
        homeMobileMenuLabel: useTranslation().t('popup.menu.home'),
        loginMobileMenuLabel: useTranslation().t('popup.menu.login'),
        registerMobileMenuLabel: useTranslation().t('popup.menu.register'),
        myprofileMobileMenuLabel: useTranslation().t('popup.menu.myprofile'),
    }

    const profileOption = isUserLoggedIn() ?
        [{ to: 'account/my-profile', description: propLabels.myprofileMobileMenuLabel, icon: 'user' }] :
        [{ to: 'account/login', description: propLabels.loginMobileMenuLabel, icon: 'user' },
        { to: 'account/register', description: propLabels.registerMobileMenuLabel, icon: 'user' }]

    return (
        <div className={menuPopUpStyles.menuPopup}>
            <nav role="navigation" className={menuPopUpStyles.navigation}>
                <div className={menuPopUpStyles.logodiv} >
                    <Link to={"/"}>
                        <LogoIcon />
                    </Link>
                </div>
                <div className={menuPopUpStyles.hamburguer} >
                    <HamburguerButton open={open} handleClick={toggleBurgerMenu} backgroundColor='white' />
                </div>
            </nav>

            <div className={menuPopUpStyles.search}>
                <SearchBar />
            </div>
            <div className={menuPopUpStyles.menuNav}>
                <MenuNav items={[{ description: propLabels.homeMobileMenuLabel, to: '/', icon: 'home' }]} />
                <MenuNav items={menuItems} />
            </div>

            {
                profileOption.map((item) => (
                    <div className={menuPopUpStyles.menuLink} onClick={() => { toggleBurgerMenu() }}>
                        <LinkItem {...item} />
                    </div>
                ))
            }

            <div className={menuPopUpStyles.bottom}>
                <LanguageSelector />
                <FooterAboutUsNote />
                <FooterPrivacyLegalNote whiteTextClass={menuPopUpStyles.whiteText} />
            </div>

        </div>
    )
}
export default MenuPopUp

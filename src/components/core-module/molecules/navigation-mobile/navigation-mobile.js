import React, { useState } from "react"
import { Link } from "gatsby"

import * as navMobileStyles from './navigation-mobile.module.scss'

import MenuPopUp from "../../../core-module/organisms/menu-popup/menu-popup"
import HamburguerButton from "../../../core-module/atoms/hamburger-button/hamburguer-button"
import MenuTab from "../../../core-module/molecules/menu-tab/menu-tab"
import LogoIcon from "../../../core-module/atoms/logo-icon/logo"

import { isUserLoggedIn } from "../../../../utils/check-user-auth"
import NotificationBar from "../notification-bar/notification-bar"

const NavigationMobile = ({ className, menuItems, counter, updateCounter }) => {

  const [visibleTab, setVisibleTab] = useState(0);
  const [open, setOpen] = useState(() => false);

  const menuActions = isUserLoggedIn() ? [
    { id: 2, tabIcon: "notification", icon: 'bell', counter, clickhandle: () => { setVisibleTab(2) } },
  ] : []

  const updateVisibleStatus = (id) => {
    setOpen(false);
    setVisibleTab((old) => (old === id ? 0 : id))
  }

  const toggleBurgerMenu = () => {
    setOpen((old) => !old);
    setVisibleTab(0);
  }

  return (
    <div className={`${className} ${navMobileStyles.content}`} >
      <nav role="navigation" className={navMobileStyles.navigation}>
        <Link className={navMobileStyles.logo} to={"/"}>
          <LogoIcon />
        </Link>
        <div className={navMobileStyles.menuItems} >
          <MenuTab data={menuActions} visibleTab={visibleTab} setVisibleTab={updateVisibleStatus} />
        </div>
        <div className={navMobileStyles.hamburguer} >
          <HamburguerButton open={open} handleClick={toggleBurgerMenu} backgroundColor='white' />
        </div>
      </nav>

      {visibleTab == 0 && open && <MenuPopUp open={open} toggleBurgerMenu={toggleBurgerMenu} menuItems={menuItems} />}
      <div key={`actionContent${visibleTab}`}>
        {visibleTab === 2 && <NotificationBar updateCounter={updateCounter} />}
      </div>
    </div>
  )
}

export default NavigationMobile
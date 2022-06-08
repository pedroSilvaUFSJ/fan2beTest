import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"

import * as navDesktopStyles from './navigation-desktop.module.scss'

import logoImage from "../../../../images/logo.svg"
import UserAuthentication from "../../../authentication-module/organisms/user-authentication/user-authentication"
import SearchBar from "../../../main-page-module/atoms/search-bar/search-bar"
import MenuTab from "../menu-tab/menu-tab"
import MenuNav from "../menu-nav/menu-nav"
import Emitter from "../../../../services/emitter"
import NotificationBar from "../notification-bar/notification-bar"
import { isUserLoggedIn } from '../../../../utils/check-user-auth'
import { useLocation } from '@reach/router';

const NavegationDesktop = ({ className, menuItems, counter, updateCounter }) => {

  const [visibleTab, setVisibleTab] = useState(0);
  const [itemMenuActions, setMenuActions] = useState([])

  useEffect(() => {   
    if ( isUserLoggedIn()) {
      setMenuActions( [
        { id: 1, tabIcon: "search", icon: 'search', clickhandle: () => { setVisibleTab(1) } },
        { id: 2, tabIcon: "notification", icon: 'bell', counter, clickhandle: () => { setVisibleTab( visibleTab === 2 ? 0 : 2) } },
        { id: 3, tabIcon: "profile", icon: 'user', clickhandle: () => { navigate(`/account/my-profile`, { replace: true }) } }
      ])
    } else {
      setMenuActions( [
        { id: 1, tabIcon: "search", icon: 'search', clickhandle: () => { setVisibleTab(1) } },
        { id: 3, tabIcon: "profile", icon: 'user', clickhandle: () => { setVisibleTab(3) } }
      ])
    }
  }, [visibleTab])



  useEffect(() => {
    Emitter.on('OPEN_SIDE_BAR', function(value) {
        setVisibleTab(value)
        Emitter.emit('RELOAD_COMMENTS')
    })
  }, [Emitter])

  return (
    <div className={`${className} ${navDesktopStyles.content}`} >
      <nav role="navigation" className={navDesktopStyles.navigation}>
        <Link className={navDesktopStyles.logo} to={"/"}>
          <img src={logoImage} alt="logo" title="Logo"/>
        </Link>
        <div className={navDesktopStyles.menuItems} >
          <MenuNav items={menuItems} />
        </div>
        <div className={navDesktopStyles.menuActions}>
          <MenuTab data={itemMenuActions} visibleTab={visibleTab} />
        </div>
      </nav>

      <div key={`actionContent${visibleTab}`}>
        {visibleTab === 1 && <SearchBar className='extrapadding' />}
        {visibleTab === 2 && <NotificationBar updateCounter={updateCounter} />}
        {visibleTab === 3 && <UserAuthentication authenticationScreenStatus={setVisibleTab} ></UserAuthentication>}
      </div>
    </div>
  )
}

export default NavegationDesktop
import React, { useEffect, useState } from 'react';
import axios from 'axios'

import OverHeader from '../../../advertisments-module/molecules/over-header/over-header'
import NavigationDesktop from '../../../core-module/molecules/navigation-desktop/navigation-desktop'
import NavigationMobile from '../../molecules/navigation-mobile/navigation-mobile'
import * as headerStyles from './header.module.scss'
import { useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"

const Header = () => {

  const [nOfUnseenNotifications, setNOfUnseenNotifications] = useState(null)
  const { language } = useI18next()

  const menuItems = [
    /*
    { description: 'Voetbal', to: 'blog/Voetbal', icon: 'volleyball-ball' },
    { description: 'Wielrennen', to: 'blog/bike', icon: 'biking' },
    */
  ]

  useEffect(() => {
    //gets notifications for first load 
    const isBrowser = () => typeof window !== "undefined"
    const userId = isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenId"))
    if (!userId) return
    axios.get(`${urlGgeneratedByLanguage(language)}/api/get-notification-data?uid=${userId}&seen_status=0`).then((response) => {
      setNOfUnseenNotifications(response.data.data.length)
    })
  }, [])

  return (
    <div className={headerStyles.content}>
      <div className={headerStyles.overHeaderContent}>
        <OverHeader />
      </div>
      <div className={headerStyles.navigationMenuContent}>
        <div className={'container ' + headerStyles.navigationMenu}>
          <NavigationDesktop className={headerStyles.navigationDesktop} menuItems={menuItems} counter={nOfUnseenNotifications} updateCounter={setNOfUnseenNotifications} />
          <NavigationMobile className={headerStyles.navigationMobile} menuItems={menuItems} counter={nOfUnseenNotifications} updateCounter={setNOfUnseenNotifications} />
        </div>
      </div>
    </div>
  )
}

export default Header

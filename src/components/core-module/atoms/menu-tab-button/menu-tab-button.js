import React from 'react'
import PropTypes from "prop-types"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as menuTabButtonStyle from "./menu-tab-button.module.scss"

const MenuTabButton = ({ isActive, clickHandler, icon, counter }) => {
    return <>
        <div className={`${menuTabButtonStyle.content} ${isActive ? menuTabButtonStyle.active : ''} `}>
            <button onClick={clickHandler}>
                {icon && <FontAwesomeIcon icon={icon} size="lg" />}
                {!!counter && <span className={menuTabButtonStyle.notificationLabel}>{counter}</span>}
            </button>
        </div>
    </>
}

MenuTabButton.defaultProps = {
    isActive: false
}

MenuTabButton.propTypes = {
    isActive: PropTypes.bool,
    icon: PropTypes.string,
    counter: PropTypes.number
}

export default MenuTabButton
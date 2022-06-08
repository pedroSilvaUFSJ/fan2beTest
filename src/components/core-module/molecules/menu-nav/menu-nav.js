import React from "react"
import PropTypes from "prop-types"

import * as  menuNavStyles from './menu-nav.module.scss'
import LinkItem from "../../../main-page-module/atoms/link-item/link-item"

const MenuNav = ({ items }) => {
    return <>
        <ul className={menuNavStyles.content}>
            {
                items?.map((item, index) => (
                    <li key={`navItem__${index}`} className={`${menuNavStyles.item}`}>
                        <LinkItem {...item} useActiveColor={true} />
                    </li>
                ))
            }
        </ul>
    </>
}

const requiredPropsCheck = (props, propName, componentName) => {
    if (!props.description && !props.icon) {
        return new Error(`One of 'description' or 'icon' is required by '${componentName}' component.`)
    }

    const wrongTypeDescription = (!!props.description && (typeof props.description !== 'string'))
    const wrongTypeIcon = (!!props.icon && (typeof props.icon !== 'string'))

    if (wrongTypeDescription || wrongTypeIcon)
        return new Error(`Invalid prop 'fontAwesome' of type '${typeof props.fontAwesome}' supplied to '${componentName}', expected 'string'.`)
}

const linkItem = {
    to: PropTypes.string.isRequired,
    description: requiredPropsCheck,
    icon: requiredPropsCheck,
    useActiveColor: PropTypes.bool,
    target: PropTypes.string,
    fontAwesomeClass: PropTypes.string,
    linkClass: PropTypes.string
}

MenuNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(linkItem)).isRequired
}

export default MenuNav
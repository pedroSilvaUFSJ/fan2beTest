
import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { content, active, fontAwesome } from './link-item.module.scss'

const LinkItem = ({ to, description, icon, useActiveColor, target, fontAwesomeClass, linkClass }) => {
    const Content = () => <>
        {!!icon && <FontAwesomeIcon className={`${fontAwesomeClass ? fontAwesomeClass : ''} ${fontAwesome}`} icon={icon} size="1x" />}
        <span>{description}</span>
    </>

    return (!to?.startsWith("http") && !to?.startsWith("www")) ?
        <Link
            className={`${content} ${linkClass ? linkClass : ''}`}
            to={`${to.charAt(0) === '/' ? to : `/${to}`}`}
            getProps={(props) => (useActiveColor && (to === props.location.hash)) ?
                { className: `${linkClass ? linkClass : ''} ${content} ${active}` } :
                { className: `${linkClass ? linkClass : ''} ${content}` }
            }
        >
            <Content />
        </Link>
        :
        <a
            href={to}
            getProps={(props) => (useActiveColor && (to === props.location.hash)) ?
                { className: `${linkClass ? linkClass : ''} ${content} ${active}` } :
                { className: `${linkClass ? linkClass : ''} ${content}` }
            }
            rel="noopener noreferrer"
            target={target}
        >
            <Content />
        </a>
}

const requiredPropsCheck = (props, componentName) => {
    if (!props.description && !props.icon) {
        return new Error(`One of 'description' or 'icon' is required by '${componentName}' component.`)
    }

    const wrongTypeDescription = (!!props.description && (typeof props.description !== 'string'))
    const wrongTypeIcon = (!!props.icon && (typeof props.icon !== 'string'))

    if (wrongTypeDescription || wrongTypeIcon)
        return new Error(`Invalid prop 'fontAwesome' of type '${typeof props.fontAwesome}' supplied to '${componentName}', expected 'string'.`)
}

LinkItem.defaultProps = {
    target: '_blank'
}

export const LinkItemProps = {
    to: PropTypes.string.isRequired,
    description: requiredPropsCheck,
    icon: requiredPropsCheck,

    useActiveColor: PropTypes.bool,
    target: PropTypes.string,
    fontAwesomeClass: PropTypes.string,
    linkClass: PropTypes.string,
}

LinkItem.propTypes = LinkItemProps

export default LinkItem
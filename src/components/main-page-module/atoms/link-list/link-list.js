
import React from 'react'
import PropTypes from "prop-types"

import * as linkListStyles from './link-list.module.scss'
import LinkItem from '../link-item/link-item'

const LinkList = ({ items, itemClass, linkClass }) => {
    return <>
        <div className={linkListStyles.content}>
            <ul className={linkListStyles.list}>
                {
                    items.map(({ link, description }, index) => (
                        <li key={`${description}${index}`} className={`${linkListStyles.item} ${itemClass ? itemClass : ''}`}>
                            <LinkItem to={link} description={description} useActiveColor={false} linkClass={`${linkClass ? linkClass : ''}`} />
                        </li>
                    ))
                }
            </ul>
        </div>
    </>
}

const item = {
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

LinkList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(item)).isRequired,
    itemClass: PropTypes.any,
    linkClass: PropTypes.any
}

export default LinkList
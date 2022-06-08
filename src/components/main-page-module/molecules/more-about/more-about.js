import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby";

import * as styles from './more-about.module.scss'
import label from '../../../../images/label.svg'
import { useTranslation } from 'gatsby-plugin-react-i18next';

const MoreAbout = ({ items }) => {
    const title = useTranslation().t('moreabout.title')
    return <>
        <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.items}>
                <img className={styles.icon} alt='label icon' src={label} />
                {items?.map(({ description, to }, index) => (
                    <Link key={`moreAbout__${index}`} className={styles.item} to={`/${to}`}>{description}</Link>
                ))}
            </div>
        </div>
    </>
}

const moreAbout = {
    items: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    })).isRequired
}

MoreAbout.propTypes = moreAbout

export default MoreAbout
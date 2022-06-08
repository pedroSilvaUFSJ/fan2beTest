
import React from 'react'
import PropTypes from "prop-types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { content, fontAwesome } from './social-media-button.module.scss'

const SocialMediaButton = ({ to, icon, target }) => (
    <a className={`${content}`} href={to} rel="noopener noreferrer" target={target}>
        <FontAwesomeIcon className={`${fontAwesome}`} icon={['fab', icon]} />
    </a>
)

SocialMediaButton.defaultProps = {
    target: '_blank'
}

export const SocialMediaButtonProps = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    target: PropTypes.string
}

SocialMediaButton.propTypes = SocialMediaButtonProps

export default SocialMediaButton
import React from "react"
import PropTypes from "prop-types"
import * as hamburguerStyle from './hamburguer-button.module.scss'

const HamburguerButton = ({ handleClick, open }) => (
    <div className={hamburguerStyle.content} onClick={handleClick} onKeyUp={(key) => key.code !== 'Tab' ? handleClick() : ''} role="button" tabIndex={0}>
        <div className={hamburguerStyle.lineTop} style={{ 'transform': open ? 'rotate(45deg)' : 'none' }} />
        <div style={{ opacity: open ? 0 : 1, transform: open ? 'translateX(-16px)' : 'none' }} />
        <div className={hamburguerStyle.lineBottom} style={{ 'transform': open ? 'translateX(-1px) rotate(-45deg)' : 'none' }} />
    </div>
)

HamburguerButton.propTypes = {
    handleClick: PropTypes.func,
    open: PropTypes.bool
}

export default HamburguerButton
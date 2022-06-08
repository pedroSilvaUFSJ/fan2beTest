import React, { useEffect, useRef, useState } from 'react'
import PropTypes from "prop-types"

import * as styles from './image-label.module.scss'
import greenBackground from '../../../../images/label-green.svg'
import blackBackground from '../../../../images/label-black.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ImageLabel = ({ text, icon, black, className, customIcon, alt }) => {
    const hasText = !!text || typeof text === 'number';

    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(ref.current.offsetWidth * 0.8)
      }, []);


    return (
        <div ref={ref} className={`${styles.content} ${className ? className : ''}`}>
            <img alt={alt} src={black ? blackBackground : greenBackground} />
            {!!hasText && (
                <svg className={`${styles.svg} ${black ? styles.svg__black : ''}`} width="100%" height="130%" viewBox='0 0 14 4'>
                    <text className={styles.label} lengthAdjust="spacing" x='-1' y="9.4" >
                        {text}
                    </text>
                </svg>
            )}
            {!!icon && (
                <svg className={`${styles.svg} ${black ? styles.svg__black : ''}`} width="100%" height={height} viewBox='1 0 10 3'>
                    <FontAwesomeIcon icon={icon} />
                </svg>
            )}
            {customIcon && <img src={customIcon} alt={alt} />}
        </div>
    )
}

const requiredPropsCheck = (props, componentName) => {
    if (props.text && (typeof props.text !== 'string' && typeof props.text !== 'number'))
        return new Error(`Invalid prop 'text' of type '${typeof props.text}' supplied to '${componentName}', expected 'string'.`)
    if (!!props.icon && (typeof props.icon !== 'string'))
        return new Error(`Invalid prop 'icon' of type '${typeof props.icon}' supplied to '${componentName}', expected 'string'.`)
}

export const ImageLabelPropTypes = {
    icon: requiredPropsCheck,
    text: requiredPropsCheck,
    black: PropTypes.bool,
    className: PropTypes.string,
}

ImageLabel.propTypes = ImageLabelPropTypes

export default ImageLabel
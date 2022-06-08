import React from 'react'
import * as containerStyle from './container.module.scss'

const Container = ({ children }) => {
    return <>
        <div className={containerStyle.content}>
            {children}
        </div>
    </>
}

export default Container

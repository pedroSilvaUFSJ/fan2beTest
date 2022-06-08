import React from "react"
import * as  menuTabStyles from './menu-tab.module.scss'
import MenuTabButton from "../../atoms/menu-tab-button/menu-tab-button"

const MenuTab = ({ data, visibleTab }) => {

    const listTitles = data.map((item, index) =>
        <li key={`menuTabItem${index}`}>
            {
                <MenuTabButton
                    isActive={visibleTab === item.id}
                    clickHandler={item.clickhandle}
                    icon={item.icon}
                    counter={item.counter}
                />
            }
        </li>
    )

    return <>
        <ul className={menuTabStyles.content}>
            {listTitles}
        </ul>
    </>
}

export default MenuTab
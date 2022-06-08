import React from "react"

import * as  menuTeamNavStyles from './menu-team-nav.module.scss'
import { Link } from "gatsby";
import LikeButton from "../../../core-module/atoms/like-button/like-button";
import TrooperButton from "../../../core-module/atoms/trooper-button/trooper-button";

const MenuTeamNav = ({ items, id, trooper }) => {
    return <>
        <div className={`${menuTeamNavStyles.menuwrapper}`}>
            <div className="container">
                <div className={menuTeamNavStyles.menu}>
                    {items?.map(({ to, description, active }, index) => (
                        <div key={`MenuTeamNavItem_${index}`} className={menuTeamNavStyles.item}>
                            <Link className={`${menuTeamNavStyles.button} ${!!active ? menuTeamNavStyles.active : ''}`} to={`/${to}`}>
                                {description}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className={menuTeamNavStyles.social}>
                <LikeButton className={menuTeamNavStyles.likeButton} interestId={id} />
                <TrooperButton {...trooper}/>
            </div>
        </div>
        <hr />
    </>
}

export default MenuTeamNav
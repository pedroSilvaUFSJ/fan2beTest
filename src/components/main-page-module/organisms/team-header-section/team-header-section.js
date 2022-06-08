import { Link } from "gatsby"
import React from 'react'

import * as teamHeaderStyles from './team-header-section.module.scss'
// import leftShadow from '../../../../images/left-cover-shadow.svg'
// import rightShadow from '../../../../images/right-cover-shadow.svg'
import ProfileRoundImage from '../../../core-module/atoms/profile-round-image/profile-round-image'
import MenuTeamNav from "../../atoms/menu-team-nav/menu-team-nav"

const TeamHeaderSection = ({ teamName, teamUrl, cover, coverAltText, crest, logo_alt_text, id, trooper, entityId, title }) => {
    let items = [];
    if(!!entityId) {
        items = [
            /* after demo these are to be hidden */
            { to: `main/entity?id=${entityId}`, description: 'Nieuws', active: true },
            // { to: '#', description: 'Seizoen' },
            //  { to: '#', description: 'Teams' },
            //  { to: '#', description: 'Transfers' },
            //  { to: '#', description: 'Info' }*/
        ]    
    }

    return (
        <>
            <div className={`${teamHeaderStyles.teamheader}`}>
                <div className={`${teamHeaderStyles.cover}`}>
                 {/* Test if the cover is not empty - If it's empty then it will hide the IMG*/
                    cover  
                    && <img key='cover_image' title={title} className={teamHeaderStyles.cover__image} alt={coverAltText} src={cover} style={{ objectFit: "cover" }} />}
                </div>
                <div className={`${teamHeaderStyles.info}`}>
                    <div className={`container ${teamHeaderStyles.info__tagname}`}>
                        <div className={teamHeaderStyles.info__tagname__logo}>
                            <Link to={teamUrl}>
                                <ProfileRoundImage src={crest} alt_text={logo_alt_text}/>
                            </Link>
                        </div>
                        <div className={teamHeaderStyles.info__tagname__title}>
                            <Link to={teamUrl}><h1>{teamName}</h1></Link>
                        </div>
                    </div>
                </div>
            </div>
            <MenuTeamNav items={items} id={id} trooper={trooper}/>
        </>
    )
}

export default TeamHeaderSection

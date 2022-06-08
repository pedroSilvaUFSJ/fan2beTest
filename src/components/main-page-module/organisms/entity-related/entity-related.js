import React, { useEffect, useState } from 'react'
import CarouselEntity from '../carousel-entity/carousel-entity'
import * as styles from './entity-related.module.scss'
import { convertStringToObject } from '../../../../utils/string-to-object';

const EntityRelated = ({ entityType, entityDetails }) => {
    const [relatedSport, setRelatedSport] = useState(null)
    const [relatedLeague, setRelatedLeague] = useState('')
    const [relatedClub, setRelatedClub] = useState('')
    const [relatedPlayer, setRelatedPlayer] = useState('')

    useEffect(() => {
        setRelatedSport(convertStringToObject(entityDetails.field_club_sport)[0])
    }, [])

    return (
        <div className={`container ${styles.content}`}>
            <div className={styles.related}>
                {relatedLeague && <CarouselEntity entity={{ id: relatedLeague.id, title: relatedLeague.name }} entityType={'league'} ></CarouselEntity>}
            </div>
            <div className={styles.related}>
                {relatedSport && <CarouselEntity entity={{ id: relatedSport.id, title: relatedSport.name }} entityType={'sport'} ></CarouselEntity>}
            </div>
            
            <div className={styles.related}>
                {relatedClub && <CarouselEntity entity={{ id: relatedClub.id, title: relatedClub.name }} entityType={'club'} ></CarouselEntity>}
            </div>
            <div className={styles.related}>
                {relatedPlayer && <CarouselEntity entity={{ id: relatedPlayer.id, title: relatedPlayer.name }} entityType={'player'} ></CarouselEntity>}
            </div>
        </div>
    )
}

export default EntityRelated

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import * as styles from './leagues-section.module.scss'
import CarouselEntity from '../carousel-entity/carousel-entity'
import { useI18next } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"

const LeaguesSection = () => {
    const { language } = useI18next()
    const [leagues, setLeagues] = useState([])

    let options =  {
        transformResponse: [
            (data) => {
             if(data) {
                let resp
                try {                
                  resp = data.slice(1) 
                } catch (error) {
                  console.log(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`)
                }
              
               let result = resp.match(/\{.*?\}/g)
                              .map(x => x.replace(/[()]/g, ""))
                              .map(x => JSON.parse(x))
      
  
               return result
             } else {
                 return data
             }
             
             
            }
          ]
    }

    useEffect(() => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/homepage-leagues`, options).then(res => {
            const leaguesWithArticles = Object.keys(res.data).filter((key) => res.data[key].count > 0).map((icon) => res.data[icon]);
            if (leaguesWithArticles.length <= 0) return
            const topTwoLeagues = leaguesWithArticles.slice(0, 4)
            setLeagues(topTwoLeagues)
        })
    }, [language])

    return (
        <div className={`container ${styles.content}`}>
            {
                leagues?.length > 0 && leagues?.map((league, index) => (
                    <div key={`carousel-section-${index}`} className={styles.postContent}>
                        <CarouselEntity entity={league} entityType={'league'} />
                    </div>
                ))
            }
        </div>
    )
}

export default LeaguesSection

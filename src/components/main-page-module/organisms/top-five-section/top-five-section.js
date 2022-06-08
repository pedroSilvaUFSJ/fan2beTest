import React, { useEffect, useState } from 'react'
import axios from 'axios'

import * as topFiveSectionStyles from './top-five-section.module.scss'
import flameImage from '../../../../images/flame.svg'
import image1 from '../../../../images/1.svg'
import image2 from '../../../../images/2.svg'
import image3 from '../../../../images/3.svg'
import image4 from '../../../../images/4.svg'
import image5 from '../../../../images/5.svg'

import ArticlePreview from '../../molecules/article-preview/article-preview'
import ImageLabel from '../../atoms/image-label/image-label'

import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"


const TopFiveSection = () => {

  const popularTitle = useTranslation().t('top5.title')
  const [topThree, setTopThree] = useState([])
  const [bottomTwo, setBottomTwo] = useState([])
  const { language } = useI18next()

  const propLabels = {
    top1Label: useI18next().t('generic.top1'),
    top2Label: useI18next().t('generic.top2'),
    top3Label: useI18next().t('generic.top3'),
    top4Label: useI18next().t('generic.top4'),
    top5Label: useI18next().t('generic.top5'),
  }

  useEffect(() => {
    axios.get(`${urlGgeneratedByLanguage(language)}/api/top5articles?_format=json`).then(res => {
      setTopThree(res.data.slice(0, 3))
      setBottomTwo(res.data.slice(3, 5))
    })
  }, [language])

  return (
    <div className={topFiveSectionStyles.content}>
      <div className="container">
        <div className={topFiveSectionStyles.header}>
          <img className={topFiveSectionStyles.header__image} src={flameImage} alt='flame icon' />
          <h1 className={topFiveSectionStyles.header__title}>{popularTitle}</h1>
        </div>
        <div className={topFiveSectionStyles.firstRow}>
          {
            topThree.length > 0 &&
            <>
              <div key={`topThree__0`} className={topFiveSectionStyles.firstRow__item}>
                <ArticlePreview article={topThree[0]} horizontal={false} />
                <ImageLabel customIcon={image1} black={true} alt={propLabels.top1Label} title={propLabels.top1Label}/>
              </div>
              <div key={`topThree__1`} className={topFiveSectionStyles.firstRow__item}>
                <ArticlePreview article={topThree[1]} horizontal={false} />
                <ImageLabel customIcon={image2} black={true} alt={propLabels.top2Label} title={propLabels.top2Label}/>
              </div>
              <div key={`topThree__2`} className={topFiveSectionStyles.firstRow__item}>
                <ArticlePreview article={topThree[2]} horizontal={false} />
                <ImageLabel customIcon={image3} black={true} alt={propLabels.top3Label} title={propLabels.top3Label}/>
              </div>
            </>
          }
        </div>
        <div className={topFiveSectionStyles.secondRow}>
          {
            bottomTwo.length > 0 &&
            <>
              <div key={`topThree__3`} className={topFiveSectionStyles.secondRow__item}>
                <ArticlePreview article={bottomTwo[0]} horizontal={true} />
                <ImageLabel customIcon={image4} black={true} alt={propLabels.top4Label} title={propLabels.top4Label}/>
              </div>
              <div key={`topThree__4`} className={topFiveSectionStyles.secondRow__item}>
                <ArticlePreview article={bottomTwo[1]} horizontal={true} />
                <ImageLabel customIcon={image5} black={true} alt={propLabels.top5Label} title={propLabels.top5Label}/>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}


export default TopFiveSection
import React from 'react'
import { Link } from 'gatsby'
import stopwatch from '../../../../images/stopwatch.svg'
import * as style from './article-preview.module.scss'

import ImageLabel from '../../atoms/image-label/image-label'
import { convertHtmlEntity, createUrlSlug } from "../../../../utils/utils"
import { convertStringToObject } from '../../../../utils/string-to-object'
import Video from '../../atoms/video-media/video-media'
import { useTranslation} from 'gatsby-plugin-react-i18next';

const ArticlePreview = ({ article, horizontal, hideTags, showSubtitle }) => {
  const size = article?.size
  const nid = article?.nid || article?.id
  const mediaUrl = article?.media_link?.trim() || ''
  const imageAlt = article?.alt_text
  const isVideo = article?.media_type === 'remote_video' || article?.media_type === 'video' ? true : false
  const videoType = article?.media_type

  const title = convertHtmlEntity(article?.name || article?.title)
  const subtitle = convertHtmlEntity(article?.subtitle || article?.subtitle)
  const created = article?.created
  const urlSlug = createUrlSlug(title)

  const relatedToClub = convertStringToObject(article?.clubs)[0]
  const relatedToLeague = convertStringToObject(article?.leagues)[0]
  const relatedToPlayer = convertStringToObject(article?.players)[0]
  const relatedToSport = convertStringToObject(article?.sports)[0]
  
  const propLabels = {
    playLabel: useTranslation().t('generic.play'),
  }
  return (
    <div className={`${style.content} ${horizontal ? style.content__horizontal : ''}`}>
      <div className={`${style.media}`} >
        <Link to={`/main/article/${urlSlug}?id=${nid}`}>
          {!isVideo && <img src={`${mediaUrl}`} alt={imageAlt} />}
          {isVideo &&
            <>
              <Video type={videoType} source={mediaUrl} showControls={false} playable={false} OnlyThumbnail={true}/>
              <div className={`${style.vidMarkup} ${isVideo ? style.showVideoTag : style.hideVideoTag}`}>
                <ImageLabel icon={'play'} className={style.imageLabel} alt={propLabels.playLabel} title={propLabels.playLabel}/>
              </div>
            </>
          }
        </Link>
      </div>
      <div className={style.infoContent}>

        <div className={`${style.title} ${size === 'lg' ? style.infoContent__lg : ''}`}>
          <Link to={`/main/article/${urlSlug}?id=${nid}`}>
            <span>{title}</span>
            {showSubtitle && <><br /><span>{subtitle}</span></>}
          </Link>
        </div>

        <div className={`${style.content}`}>
          {!hideTags &&
            <span className={`${style.links}`}>
              {relatedToClub &&
                <span className={`${style.link}`}>
                  <Link className={`${style.hashtagslink}`} to={`/main/entity?id=${relatedToClub.id}`}>
                    {relatedToClub && <span> #{relatedToClub.name}</span>}
                  </Link>
                </span>
              }
              {relatedToLeague &&
                <span className={`${style.link}`}>
                  <Link className={`${style.hashtagslink}`} to={`/main/entity?id=${relatedToLeague.id}`}>
                    {relatedToLeague && <span> #{relatedToLeague.name}</span>}
                  </Link>
                </span>
              }
              {relatedToPlayer &&
                <span className={`${style.link}`}>
                  <Link className={`${style.hashtagslink}`} to={`/main/entity?id=${relatedToPlayer.id}`}>
                    {relatedToPlayer && <span> #{relatedToPlayer.name}</span>}
                  </Link>
                </span>
              }
              {relatedToSport &&
                <span className={`${style.link}`}>
                  <Link className={`${style.hashtagslink}`} to={`/main/entity?id=${relatedToSport.id}`}>
                    {relatedToSport && <span> #{relatedToSport.name}</span>}
                  </Link>
                </span>
              }
            </span>
          }
          <span className={`${style.time}`}>
            {created && <span><img alt='stopwatch' src={stopwatch} />{created}</span>}
          </span>
        </div>
      </div>
    </div >
  )
}

export default ArticlePreview

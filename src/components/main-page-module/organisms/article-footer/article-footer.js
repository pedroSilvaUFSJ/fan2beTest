import React, { useEffect, useState } from 'react'
import axios from 'axios'

import * as styles from './article-footer.module.scss'
// import SocialNetwork from '../../atoms/social-network/social-network'
// import ShareButton from '../../atoms/share-button/share-button'
import MoreAbout from '../../molecules/more-about/more-about'
import Reactions from '../../molecules/reactions/reactions'
import LikeButton from '../../../core-module/atoms/like-button/like-button'
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from "../../../../utils/utils"
import Advertisement, {classOptions} from "../../../advertisments-module/atoms/advertisement/advertisement"

const ArticleFooter = ({ article }) => {

    const isBrowser = () => typeof window !== "undefined"
    const queryString = isBrowser() && window ? window.location.search : ''
    const urlParams = new URLSearchParams(queryString);
    const articleId = urlParams.get('id');

    const [comments, setComents] = useState(null)
    const { language } = useI18next()

    useEffect(() => {
        getComments();
    }, [articleId])

    const getComments = () => {
        axios.get(`${urlGgeneratedByLanguage(language)}/api/comments?_format=json&id=${articleId}`).then((result) => {
            let commentDetails = result.data.map(result => { return { id: result.article_id, userId: result.user_id, user: result.user_name, date: result.postdate, comment: result.comment } });
            setComents(commentDetails)
        })
    }

    const moreAbout = article?.moreDetails
    const articleFooterTitle = useTranslation().t('article.footer.title')

    return (
        <div className={`container ${styles.content}`}>
            <div className={styles.social}>{ /*for left space to match top component */}</div>

            <div className={styles.wrapper}>
                <div className={styles.socialComments}>
                    <div className={styles.social}>
                        {/*<h1 className={styles.social__title}>{articleFooterTitle}</h1>
                        <div className={styles.social__socialNetwork}>
                            <LikeButton className={styles.likeButton} />
                            <div className={styles.sharing}>
                                {
                                    /*
                                    <SocialNetwork horizontal={true} className={styles.socialNetwork} />
                                    <ShareButton />
                                    
                                }

                            </div>
                            </div>*/}
                    </div>
                    {!!comments && !!articleId && <Reactions items={comments} articleId={articleId} refresh={getComments} />}
                    <div className={styles.firstLayer__advertisement}>
                        <Advertisement classOption={classOptions.advertisementFooter}/>
                    </div>
                </div>
                {!!moreAbout.length && <MoreAbout items={moreAbout} />}
            </div>


            <div className={styles.advertisement}>{ /*for right space to match top component */}</div>
        </div>
    )
}


export default ArticleFooter

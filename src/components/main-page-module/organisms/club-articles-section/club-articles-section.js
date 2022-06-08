import React, { useState } from "react"
import PropTypes from "prop-types"

import * as styles from './club-articles-section.module.scss'
import ArticlePreview, { ArticlePreviewProps } from "../../molecules/article-preview/article-preview"
import Advertisement, {classOptions} from "../../../advertisments-module/atoms/advertisement/advertisement"
import { useTranslation } from "react-i18next"
import ExtraAd from "../../../advertisments-module/organisms/extra-ad/extra-ad"
import EgPower from '../../../advertisments-module/organisms/eg-power/eg-power'

const ClubArticlesSection = ({ posts, advertisement, entityId }) => {
    const [firstRow] = useState(() => posts.slice(0, 2));
    const [otherPosts, setOtherPosts] = useState(() => posts.slice(2));
    const loadMoreTextLabel = useTranslation().t('entity.articles.loadmoreButtonLabel');
    const outterClass = { title: styles.articleTitle }

    const loadMoreHandler = () => {
        const mockPosts = [...posts];
        setOtherPosts(old => [...old, ...mockPosts])
    }

    return (
        <div className={`container ${styles.content}`}>
            <div className={styles.main}>
                <div className={styles.articles}>
                    <div className={styles.firstRow}>
                        {firstRow.map((item, index) => (
                            <div key={`randonPost_vertical${index}`} className={styles.firstRow__item}>
                                <ArticlePreview article={item} />
                            </div>
                        ))}
                    </div>
                    {posts.allowEgPower && <EgPower entityId={entityId}/>}
                    <div className={styles.secondRow}>
                        <div className={styles.secondRow__posts}>
                            {otherPosts?.map((item, index) => (
                                <div key={`randonPost_horizontal${index}`} className={styles.secondRow__posts__item}>
                                    <ArticlePreview article={item} horizontal={true} outterClass={outterClass} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.advertisement}>
                    <ExtraAd />
                    {!!advertisement && <Advertisement campaignId={advertisement.campaignId} mediaUrl={advertisement.media_link} addUUID={`${advertisement.id}-entity-${advertisement.position}`} destinationLink={advertisement.url} mediaType={advertisement.media_type} classOption={classOptions.advertisementClubArticle}/>}
                </div>
            </div>
            <div className={styles.loadMore}>
                {otherPosts?.lengh > 5 && <button className={`${styles.loadMore__button}`} onClick={() => loadMoreHandler()}>{loadMoreTextLabel}</button>}
            </div>
        </div>
    )
}

ClubArticlesSection.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(ArticlePreviewProps)).isRequired
}

export default ClubArticlesSection

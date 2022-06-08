import React from 'react'
import PropTypes from "prop-types"

import * as styles from './more-posts-section.module.scss'
import MorePosts, { MorePostsPropTypes } from '../../molecules/more-posts/more-posts'

const MorePostsSection = ({ data }) => (
    <div className={`container ${styles.content}`}>
        {!!data &&
            <div className={styles.postContent}>
                <MorePosts {...data} />
            </div>
        }
    </div>
)

MorePostsSection.propTypes = {
    posts: PropTypes.shape(MorePostsPropTypes)
}

export default MorePostsSection
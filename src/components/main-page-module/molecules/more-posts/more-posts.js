
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "gatsby";
import PropTypes from "prop-types"

import * as morePostsStyle from './more-posts.module.scss'
import ArticlePreview, { ArticlePreviewProps } from "../article-preview/article-preview";

const MorePosts = ({ title, articles, linkText, to, className }) => {
    return (
        <div className={`${morePostsStyle.content} ${className ? className : ''}`}>
            <div className={morePostsStyle.header}>
                <h1 className={morePostsStyle.header__title}>{title}</h1>
                <Link className={`${morePostsStyle.header__link}`} to={`/${to}`}>
                    <span className={morePostsStyle.header__link__message}>{linkText}</span><FontAwesomeIcon className={morePostsStyle.header__link__icon} icon='arrow-right' />
                </Link>
            </div>
            <div className={morePostsStyle.posts}>
                {
                    articles?.map((item, index) => (
                        <div key={`${item.title}${index}`} className={morePostsStyle.posts__item}>
                            <ArticlePreview article={item} size='sm' hideTeamLink={true} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export const MorePostsPropTypes = {
    title: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(PropTypes.shape(ArticlePreviewProps)).isRequired,
    linkText: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
}

MorePosts.propTypes = MorePostsPropTypes

export default MorePosts
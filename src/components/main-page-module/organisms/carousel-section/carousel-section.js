import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "gatsby";
import Slider from '../../atoms/slider/slider';
import * as stylesPostCarousel from './carousel-section.module.scss'
import PropTypes from "prop-types"
import { ArticlePreviewProps } from "../../molecules/article-preview/article-preview"
import { useTranslation } from "react-i18next";

/**
 * @param { title, articles, linkTo }  
 * @returns A component rendering: a title, a link for a new page 
 *  as well as a list of <ArticlePreview> elements from a list withithin a slider
 */
const CarouselSection = ({ title, articles, linkTo }) => {
    const linkText = useTranslation().t('carousel.more')

    return (
        <div className={`${stylesPostCarousel.content}`}>
            <div className={stylesPostCarousel.header}>
                <h1 className={stylesPostCarousel.header__title}>{title}</h1>
                <Link className={`${stylesPostCarousel.header__link}`} to={linkTo}>
                    <span className={stylesPostCarousel.header__link__message}>{linkText} {title}</span>
                    <FontAwesomeIcon className={stylesPostCarousel.header__link__icon} icon='arrow-right' />
                </Link>
            </div>
            <div className={stylesPostCarousel.slider}>
                <Slider items={articles} />
            </div>
        </div>
    )
}

export const CarouselSectionPropTypes = {
    title: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(PropTypes.shape(ArticlePreviewProps)).isRequired,
    linkTo: PropTypes.string.isRequired,
}

CarouselSection.propTypes = CarouselSectionPropTypes

export default CarouselSection

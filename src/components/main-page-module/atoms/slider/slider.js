
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types"
import TinySlider from "tiny-slider-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { window, exists } from 'browser-monads';

import * as styles from './slider.module.scss'
import { ArticlePreviewProps } from "../../molecules/article-preview/article-preview";
import backgroundButton from '../../../../images/slider-button.svg'

const makeid = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


const Slider = ({ items, className }) => {
    const randomId = makeid();
    const [isReady, setReady] = useState(false)
    const [index, setIndex] = useState(0)
    const ts = useRef(null);

    useEffect(() => {
        setReady(document.querySelector(`#customizeControls${randomId}`) !== null)        
      }, [randomId]);

    const settings = {
        loop: false,
        items: 1,
        slideBy: 'page',
        nav: false,
        autoplay: false,
        speed: 400,
        swipeAngle: false,
        controls: false,
        autoplayButtonOutput: false,
        mouseDrag: true,
        lazyload: true,
        controlsContainer: false,// `#customizeControls${randomId}`,
        fixedWidth: 212,
        responsive: {
            768: {
                fixedWidth: 284,
            },
        }
    }

    const SliderButton = ({ ts, side, className }) => (
        <div className={`${styles.sliderButton} ${className}`} role="button" 
            onClick={() => { 
                ts.current.slider.goTo(side === 'right' ? 'next' : 'prev')
                getSliderInfo(ts.current.slider)                    
            }}>
          <img className={`${styles.sliderButton__img} ${side === 'left' ? styles.sliderButton__left : ''}`} alt='slider prev button' src={backgroundButton} />
          <svg className={`${styles.sliderButton__svg}`} width="100%" height="100%" viewBox={`${side === 'left' ? 0.5 : -0.5} 0 4 2`}>
              <FontAwesomeIcon icon={`angle-${side === 'left' ? 'left' : 'right'}`} />
          </svg>
      </div>
    )
  
    const getSliderInfo = (slider) => {
      let info, last, indexCurrent = 0

      info = slider && slider.getInfo ? slider.getInfo() : 0
      indexCurrent = info !== 0 ?  info.index : indexCurrent
      last = info.displayIndex + info.items - 1

      setIndex(last === items.length ? last : indexCurrent)
    }

    return (
        <div className={`${styles.content} ${className ? className : ''}`}>
            {exists(window) &&  isReady && <TinySlider onIndexChanged={ (evt) => getSliderInfo(ts.current.slider)} ref={ts} settings={settings}>{items}</TinySlider>}
            <div className={`${styles.controls}`} id={`customizeControls${randomId}`}>
                <SliderButton ts={ts} className={`${styles.prev} ${index === 0 ? styles.sliderButton__hidden :  styles.sliderButton__visible}`} side='left' />
                <SliderButton ts={ts} className={`${styles.next} ${index === items.length || items.length < 4 ? styles.sliderButton__hidden :  styles.sliderButton__visible}`} side='right' />
            </div>
        </div>
    );
}

Slider.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(ArticlePreviewProps)).isRequired,
    className: PropTypes.string
}

export default Slider
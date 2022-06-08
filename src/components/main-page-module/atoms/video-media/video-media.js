import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as VideoStyle from './video-media.module.scss'

const Video = ({ source, type, showControls, playable, OnlyThumbnail = false }) => {
    let sourceUrl = source
    let youtubeId = '';
    let _videoSupplier = '';

    if (type !== 'video' && source && source.includes('vimeo')) {
        let urlPieces = source.split('/')
        let vimeoId = urlPieces[urlPieces.length - 1]
        sourceUrl = "https://player.vimeo.com/video/" + vimeoId
        _videoSupplier = 'VIMEO';
    }

    if (type !== 'video' && source && source.includes('youtube')) {
        if (!source.includes('embed')) {
            let urlPieces = source.split('watch?v=')
            youtubeId = urlPieces[1];
            sourceUrl = `${urlPieces[0]}embed/${youtubeId}`
        }
        _videoSupplier = 'YOUTUBE';
    }
    
    const [thumbnail, setThumbnail] = useState('');
    const [altText, setAltText] = useState('');

    const playVideo = (e) => {
        if (playable) { e.target.play() }
    }

    useEffect(() => {

        switch(_videoSupplier) {
            case 'VIMEO':
                axios.get(`https://vimeo.com/api/oembed.json?url=${source}`, { })
                .then((response) => {
                    setThumbnail(response.data?.thumbnail_url ?? '');
                    setAltText(response.data?.title ?? '');
                })
            break;
            case 'YOUTUBE':
                setThumbnail(`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`);
            break;
        }
    })

    return <>
        {
            type !== 'video' && OnlyThumbnail && thumbnail &&
                <img alt={altText} src={thumbnail}></img>
        }
        {
            type === 'video' && (!OnlyThumbnail || !thumbnail) && showControls &&
            <video controls className={VideoStyle.video_content} id="videoArtilce" onClick={playVideo}>
                <source src={source} />
                Your browser does not support HTML5 video.
            </video>
        }
        {
            type === 'video' && (!OnlyThumbnail || !thumbnail) && !showControls &&
            <video className={VideoStyle.video_content} id="videoArtilce" onClick={playVideo}>
                <source src={source} />
                Your browser does not support HTML5 video.
            </video>
        }
        {
            type !== 'video' && (!OnlyThumbnail || !thumbnail) &&
            <div className={ !playable ? VideoStyle.video_container : VideoStyle.video_container_article} >
                <iframe className={ !playable ? VideoStyle.responsive_iframe: VideoStyle.responsive_iframe_article}   src={sourceUrl}
                frameBorder="0"
                allowFullScreen="true"
                allow="fullscreen; autoplay; encrypted-media">
                </iframe>
            </div>
        }
    </>
}

export default Video
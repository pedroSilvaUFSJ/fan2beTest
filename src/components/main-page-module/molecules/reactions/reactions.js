import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import axios from 'axios'
import { navigate } from 'gatsby'

import * as styles from './reactions.module.scss'
import stopwatch from '../../../../images/stopwatch.svg'
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { urlGgeneratedByLanguage } from '../../../../utils/utils'
import Emitter from '../../../../services/emitter'

const Reactions = ({ items, articleId, refresh }) => {

    const [limit, setLimit] = useState(() => (items.length > 3) ? 3 : 3);
    const [counter, setCounter] = useState(items.length);
    const [newComment, setNewComment] = useState('');
    const [userId, setUserId] = useState('');
    const { language } = useI18next()
    const isBrowser = () => typeof window !== "undefined"

    const propLabels = {
        title: useTranslation().t('reactions.title'),
        inputPlaceholder: useTranslation().t('reactions.inputPlaceholder'),
        loadMore: useTranslation().t('reactions.loadMore')
    }

    useEffect(() => {   
        Emitter.on('RELOAD_COMMENTS', function(){
            setUserId(isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenId")))
        })
        
    }, [Emitter])

    useEffect(() => {
        setUserId(isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenId")))
    }, [isBrowser])

    const loadMoreHandler = () => {
        setLimit(items.length);
    }

    const convertComment = (comment) => {
        return comment.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }

    const onFormSubmit = e => {
        e.preventDefault();
        const csrf_token = isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenCSRF"))
        const basicAuth = isBrowser() && window !== 'undefined' && JSON.parse(window.localStorage.getItem("tokenAuth"))

        const header = {
            'Content-Type': 'application/json',
            'Authorization': basicAuth,
        }

        if (csrf_token !== null && csrf_token !== undefined && userId !== null && userId !== undefined) {
            let commentsCount = counter
            const request = {
                entity_id: [{ target_id: articleId }],
                uid: [{ target_id: userId }],
                status: [{ value: 1 }],
                entity_type: [{ value: "node" }],
                comment_type: [{ target_id: "comment" }],
                field_name: [{ value: "field_article_comments" }],
                subject: [{ value: "WOw great" }],
                comment_body: [{ value: newComment }]
            }

            axios.post(`${urlGgeneratedByLanguage(language)}/comment?_format=json`, JSON.stringify(request), { headers: header }).then((response) => {
                setNewComment("")
                setCounter(commentsCount += 1)
                refresh()
            }).catch(err => {
                if (err.response.status === 403 ) {
                   //TODO: next phase -> refreshToken
                }


                console.log('error', err)
               
            })
        } else {
            navigate("/", { replace: true })
        }
    }

    return <>
        <div className={styles.content}>
            <h1 className={styles.title}><span className={styles.qtd}>{counter}</span> {propLabels.title}</h1>
            {userId && 
                <form onSubmit={onFormSubmit}>
                    <input className={`${styles.input}`} type="text" placeholder={propLabels.inputPlaceholder} onChange={event => setNewComment(event.target.value)} value={newComment} />
                </form>
            }
            {items.slice(0, limit).map(({ user, date, comment }, index) => (
                <div key={`reaction__${index}`} className={styles.reaction}>
                    <div className={styles.reaction__info}>
                        <p className={styles.reaction__info__user}>{user}</p>
                        <img className={styles.reaction__info__icon} alt='stopwatch' style={{ width: '16px' }} src={stopwatch} />
                        <p className={styles.reaction__info__date}>{date}</p>
                    </div>
                    <p className={styles.reaction__comment}>{convertComment(comment)}</p>
                </div>
            ))}
            <div className={styles.loadMore}>
                {(limit < items.length) && <button className={`${styles.loadMore__button}`} onClick={() => loadMoreHandler()}>{propLabels.loadMore}</button>}
            </div>
        </div>
    </>
}

const reactionsPropTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        user: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    })).isRequired
}

Reactions.propTypes = reactionsPropTypes

export default Reactions
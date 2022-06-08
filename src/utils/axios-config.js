
/** AXIOS Configuration INTERCEPT */
import axios from 'axios'

export const generateToken = () => {

    const isBrowser = () => typeof window !== "undefined"
    const csrf_token = isBrowser() && window && JSON.parse(window.localStorage.getItem("tokenCSRF"))
    const language = (isBrowser() && window.localStorage.getItem("gatsby-i18next-language")) || 'nl'

    if (!csrf_token) {
        axios.get(`${process.env.GATSBY_API_URL}/${language}/session/token`)
            .then((response) => {
                isBrowser() && window !== 'undefined' && window.localStorage.setItem("tokenCSRF", JSON.stringify(response.data))
            })
    }
}

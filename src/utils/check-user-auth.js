export const isUserLoggedIn = () => {
    const isBrowser = () => typeof window !== "undefined"
    return isBrowser() && window && window.localStorage.getItem("tokenId")
}

const React = require("react")

const HeadComponents = [
    <script
        key="1-http-ads"
        data-ad-client="ca-pub-7126304366095999"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />,
]

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
    setHeadComponents(HeadComponents)
}
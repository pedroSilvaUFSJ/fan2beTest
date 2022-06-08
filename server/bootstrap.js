const path = require('path');
require('dotenv').config()
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 80;

//remove this in the future
const middlewareRedirectEnglishPagesToDutch = function(req,res, next){
    let urlPieces = req.originalUrl.split('/');
    if(urlPieces[1] && urlPieces[1].toLowerCase() === 'en') {
        urlPieces.splice(1, 1)
        res.redirect(urlPieces.join('/'));
        return;
    }
    next()
}

const middlewareRedirect404 = function(req, res) {
    res.redirect('/404')
}


app.get('*/main/article/*', async (req, res, next) => {
    let article = {};

    if(req.query.id === undefined) {
        next()
        return;
    }

    const result = await axios.get(`${process.env.GATSBY_API_URL}/nl/api/view/articles?_format=json&id=${req.query.id}`);
    if(result.data.length > 0) {
        article = result.data[0];
    }

    const indexPath  = path.resolve(__dirname, '..', 'public/main/article', 'index.html');

    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }

        let replacer = '<head>';

        if(Object.keys(article).length > 0) {
            replacer += `<meta property="og:type" content="article" /><meta property="og:title" content="Fan2Be - ${article.title}" /><meta property="og:description" content="${article.subtitle}" /><meta property="og:image" content="${article.media_link}" />`
        }

        const newHtml = htmlData.replace(
            "<head>",
            replacer
        )

        res.send(newHtml);
    });
});

// exposing the public folder containing others content
app.use(express.static(
    path.resolve(__dirname, '..', 'public')
));

app.use(middlewareRedirectEnglishPagesToDutch);
app.use(middlewareRedirect404);

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});
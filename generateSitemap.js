const fs = require('fs');
const axios = require('axios');
const clc = require('cli-color');

let header = '<?xml version="1.0" encoding="UTF-8"?>'
let new_line = '\r\n'
let urlset_start = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
let urlset_end = '\n</urlset>'
let urls = ''
let pages = ''
let staticPages = [
    '',
    'account/register-club/',
    'advertisement/request/',	
    'company/about-us/',
    'company/collaborate/',	
    'company/jobs/',
    'company/contact/',	
    'company/privacy/',	
    'company/legal/',
    'company/cookies/',
]

const getPagesName = () => { 
    /* TODO: loop on folder pages */
    fs.readdir("../src/pages", { withFileTypes: true }, (err, dirEntries) => {
        dirEntries.forEach((dirEntry) => {
            const { name } = dirEntry;
            if (dirEntry.isDirectory()) {
              console.log(`DIR: ${name}`);
              dirEntry.forEach((direct) => {
                  console.log('test', direct)
              })
            } else {
              console.log(`FILE: ${name}`);
            }
        })
    })
}

const createUrlSlug = (content) => content.replace(/[^\w\s]/gi, '').split(' ').map(item => item.toLowerCase()).join('-')

const generateSiteMap = (url_api, url_site) => {
    let final_str = header + new_line

    staticPages.forEach((element) => {             
        pages += `<url>\n<loc>${url_site + '/' + element}</loc>\n<changefreq>daily</changefreq>\n<priority>0.7</priority>\n</url>\n`       
      })

      axios.all([
            axios.get(`${url_api}/api/view/articles?_format=json`), 
            axios.get(`${url_api}/api/clubs?_format=json`)
        ]).then(result => {
            let articlesResult = result[0].data
            let clubsResult = result[1].data
            let total = result[0].data.length + result[1].data.length

            
            articlesResult.forEach(element => {
                let url = `${url_site}/main/article/${createUrlSlug(element.title)}?id=${element.id}`    
                urls += `<url>\n<loc>${url}</loc>\n<changefreq>daily</changefreq>\n<priority>0.7</priority>\n</url>\n`
            
            })
            
            clubsResult.forEach(element => {
                let url = `${url_site}/main/entity?id=${element.id}`    

                urls += `<url>\n<loc>${url}</loc>\n<changefreq>daily</changefreq>\n<priority>0.7</priority>\n</url>\n`
                final_str = urlset_start + pages + urls + urlset_end
            })

            fs.writeFile('./public/sitemap/sitemap.xml', final_str, function (err) {
                if (err) throw err;
            })

            console.log(clc.blue('A total of ')+clc.blue.bold(`${total} articles urls `)+clc.blue('added to Sitemap'))
        })     
}

module.exports = generateSiteMap
export const createPreviewArticleObject = ({ fields, frontmatter }) => {
    const { teamUrl, teamName, date, title, featuredImage, featuredImageSm, icon } = frontmatter;
    const team = { url: teamUrl, name: teamName }
    const imageLabelProps = icon ? { icon } : null;
    const img = { ...featuredImage?.childImageSharp?.fluid }
    const imgSm = { ...featuredImageSm?.childImageSharp?.fluid }
    const response = { date, title, team, imageLabelProps, uri: teamUrl + fields.slug, img, imgSm };
    return response;
}

export const createTopFiveArticleObject = ({ fields, frontmatter }, index) => {
    const { teamUrl, teamName, date, title, featuredImage } = frontmatter;
    const team = { url: teamUrl, name: teamName }
    const imageLabelProps = { text: index + 1, black: true };
    const img = { ...featuredImage?.childImageSharp?.fluid }
    return { date, title, team, imageLabelProps, uri: teamUrl + fields.slug, img };
}

export const createAdvertisementObject = ({ frontmatter }) => {
    return {
        imageSm: frontmatter.featuredImageSm?.childImageSharp?.fluid,
        image: frontmatter.featuredImage?.childImageSharp?.fluid,
        size: frontmatter.size,
        link: frontmatter.advertisementUrl
    }
}

export const createUrlSlug = (content) => content.replace(/[^\w\s]/gi, '').split(' ').map(item => item.toLowerCase()).join('-')


export const createHeaderObj = ({ frontmatter, fields }) => {
    return {
        title: frontmatter.title,
        cover: frontmatter.cover?.childImageSharp?.fluid,
        crest: frontmatter.crest?.childImageSharp?.fluid,
        teamUrl: fields.slug
    }
}

export const urlGgeneratedByLanguage = (lang) => {
    const language = lang || 'nl'
    const url = `${process.env.GATSBY_API_URL}/${language}`
    return url;
}

export const convertHtmlEntity = (string) => {
    return (string || "").replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

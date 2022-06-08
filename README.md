# Contentful Gatsby Starter Blog

![The index page of the starter blog](https://rawgit.com/contentful/starter-gatsby-blog/master/screenshot.jpg "The index page of the starter blog")

Static sites are scalable, secure and have very little required maintenance. They come with a drawback though. Not everybody feels good editing files, building a project and uploading it somewhere. This is where Contentful comes into play.

## Features

- Simple content model and structure. Easy to adjust to your needs.
- Use the [synchronization feature](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/synchronization) of our [Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/).
- Responsive/adaptive images via [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) and our [Images API](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/synchronization/initial-synchronization-of-entries-of-a-specific-content-type).

## Getting started

See our [official Contentful getting started guide](https://www.contentful.com/developers/docs/tutorials/general/get-started/).

### Get the source code and install dependencies.

```
$ git clone https://github.com/contentful/starter-gatsby-blog.git
$ npm install
```

Or use the [Gatsby CLI](https://www.npmjs.com/package/gatsby-cli).

```
$ gatsby new contentful-starter-blog https://github.com/contentful/starter-gatsby-blog/
```

### Set up of the needed content model and create a configuration file

This project comes with a Contentful setup command `npm run setup`.

This command will ask you for a space ID, and access tokens for the Contentful Management and Delivery API and then import the needed content model into the space you define and write a config file (`./.contentful.json`).

`npm run setup` automates that for you but if you want to do it yourself rename `.contentful.json.sample` to `.contentful.json` and add your configuration in this file.

## Crucial Commands

### `npm run dev`

Run the project locally with live reload in development mode.

### `npm run build`

Run a production build into `./public`. The result is ready to be put on any static hosting you prefer.

### `npm run serve`

Spin up a production-ready server with your blog. Don't forget to build your page beforehand.

## Contribution

Feel free to open pull requests to fix bugs. If you want to add features, please have a look at the [original version](https://github.com/contentful-userland/gatsby-contentful-starter). It is always open to contributions and pull requests.

You can learn more about how Contentful userland is organized by visiting [our about repository](https://github.com/contentful-userland/about).

## Server Side Rendering

When you're making request to the following list of URL's, it goes by the code that you can check the implementation details inside *server/bootstrap.js*. Basically, that script was made to inject the facebook metatags in the pages listed below (since the process to build the page is all done by the react in the browser, and some webcrawlers, like the facebook, doesn't run the script required to load these dynamic contents.) 

 - main/article

 __NOTE:__  the build process is the same, if you need to modify the bootstrap.js you have to send the file separately.

## Deployment

To make the deployment you need to switch to the branch the you want to make the deployment and run the command associated with the branch.

 - branch: *development* 
    - npm run build-dev
 - branch: *testing*     
    - npm run build-test
 - branch: *uat*         
    - npm run build-uat
 - branch: *production*  
    - npm run build-prod

 Gonna be generated a zip file corresponding to the environment name inside a folder called build in the root directory. Send this file to Infanion Team.

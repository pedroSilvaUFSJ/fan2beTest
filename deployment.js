// require modules
const fs = require('fs');
const clc = require('cli-color');
const archiver = require('archiver');
const buildFolder = process.cwd()+'/builds';
const siteMapGenerator = require('./generateSitemap')
let environment = '';

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


// reading the environment where the build gonna be generated
if(process.argv[2]) {
  environment = process.argv[2];
}

if (!environment || !fs.existsSync(process.cwd()+'/.env.'+environment)) {
  console.log(clc.red('No env file ')+clc.red.bold(`.env.${environment}`)+clc.red(' found in the root directory. Please, ask someone in the team for this file'));
  process.exit(1);
}


// generate sitemap
require("dotenv").config({
  path: `.env.${environment}`,
})
siteMapGenerator(process.env.GATSBY_API_URL, process.env.FRONTEND_URL)



// create build folder
try {
  if (!fs.existsSync(buildFolder)) {
    fs.mkdirSync(buildFolder);
  }
} catch (err) {
  console.error(err);
}


// create a file to stream archive data to.
const output = fs.createWriteStream(buildFolder + `/${environment}-fan2be.zip`);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
  console.log('Build size: '+formatBytes(archive.pointer()));
  console.log(clc.bold.green(`Your build ${environment}-fan2be.zip is ready inside the build folder!`));
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function() {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);


// append packages files
archive.file('deploy.json', {name:'package.json'});
archive.file(`.env.${environment}`, {name:`.env`});

// append directories
archive.directory('public/');
archive.directory('server/');

// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();
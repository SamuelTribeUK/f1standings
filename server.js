const axios = require('axios');
const express = require('express');
const fs = require('fs');
const fsx = require('fs-extra');
const fetch = require('node-fetch');
const history = require('connect-history-api-fallback');

let settings = { method: 'Get' };
// When server.js runs the driverStandings.json file will be updated immediately using updateData() and then called every 5 minutes
updateData();
setInterval(updateData, 86400000);
// Get the driver pictures, then update the driver pictures from wikipedia every week
getDriverNames();
setInterval(getDriverNames, 86400000);

const app = express();
app.use(history());
app.listen(3000);

app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-Width');
  next();
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-Width');
  next();
});

app.use(express.static('dist'));
app.use('/driver/driverPictures', express.static('driver/driverPictures'));

// when /driverStandings.json is accessed with a GET request the ./json/driverStandings.json file is sent back to the user
app.get('/driverStandings.json', function (req, res) {
  fs.readFile('./json/driverStandings.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.json(JSON.parse(data));
  });
});

app.get('/constructorStandings.json', function (req, res) {
  fs.readFile('./json/constructorStandings.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.json(JSON.parse(data));
  });
});

/**
 * The updateData function uses node-fetch to fetch the driverStandings.json file from the ergast F1 developer API and saves it locally under the ./json/ directory.
 */
function updateData() {
  console.log('updateData function called');
  let api_driver_url = 'https://ergast.com/api/f1/current/driverStandings.json';
  let api_constructor_url =
    'https://ergast.com/api/f1/current/constructorStandings.json';

  // Get the driver standings
  fetch(api_driver_url, settings)
    .then((res) => res.json())
    .then((json) => {
      let jsonContent = JSON.stringify(json);

      fs.writeFile(
        './json/driverStandings.json',
        jsonContent,
        'utf8',
        function (err) {
          if (err) {
            console.log('Error writing driver JSON to file');
            return console.log(err);
          }
        }
      );
    });

  // Get the constructors standings
  fetch(api_constructor_url, settings)
    .then((res) => res.json())
    .then((json) => {
      let jsonContent = JSON.stringify(json);

      fs.writeFile(
        './json/constructorStandings.json',
        jsonContent,
        'utf8',
        function (err) {
          if (err) {
            console.log('Error writing constructor JSON to file');
            return console.log(err);
          }
        }
      );
    });
}

function getDriverNames() {
  let jsonData;

  // Get the driver pictures from Wikipedia
  fs.readFile('./json/driverStandings.json', 'utf8', async (err, data) => {
    if (err) {
      throw err;
    }
    jsonData = JSON.parse(data);
    jsonData = jsonData.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for (const id in jsonData) {
      let name =
        jsonData[id].Driver.givenName + ' ' + jsonData[id].Driver.familyName;
      if (name === 'Carlos Sainz') {
        name += ' Jr';
      } else if (name === 'George Russell') {
        name += ' (racing driver)';
      }
      jsonData[id].Driver.wikiName = name;
      let driverNum = jsonData[id].Driver.permanentNumber;
      getDriverPicUrlWiki(
        name,
        'https://en.wikipedia.org/w/api.php',
        driverNum
      );
      // So we do not abuse the wiki api, wait 5 seconds between each request
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  });
}

// PLAN : Get an array of all driver names, which will be used for the Wikipedia API requests to get the thumbnail image URL, which we then download.
// REFACTOR : getDriverPicUrlWiki previously used a single api request to get all driver picture urls, but this is not useful to link to our existing driverStandings json data. instead, use a staggered one-by-one request approach (adding a wait for e.g. 1-5 seconds between requests so it never spams ~20 requests at a time)
async function getDriverPicUrlWiki(titles, url, driverNumber) {
  // Use the base for wiki api url call and append params to it.
  await axios
    .get(url, {
      params: {
        action: 'query',
        format: 'json',
        prop: 'pageimages',
        titles: titles,
        redirects: 1,
        converttitles: 1,
        piprop: 'original',
      },
      headers: {
        'User-Agent':
          'f1Standings/1.3.3 (https://f1.samueltribe.com/; samuel@samueltribe.com)',
      },
    })
    .then((result) => {
      let driverPicUrlList = result.data.query.pages;
      for (const id in driverPicUrlList) {
        let url;
        if (driverPicUrlList[id].original.source !== undefined) {
          url = driverPicUrlList[id].original.source;
          downloadImage(url, driverNumber).catch(console.error);
        }
      }
      console.log('driver picture for ' + driverNumber + ' updated');
      return result.data;
    });
}

async function downloadImage(url, filepath) {
  // If public/driverPictures does not exist, create it first
  fsx.ensureDir('./driver/driverPictures');
  // Save the image with the filename of their driver number - so we can easily retrieve on the front end
  filepath = './driver/driverPictures/' + filepath + '.jpg';
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath));
  });
}

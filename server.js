const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');
// When server.js runs the driverStandings.json file will be updated immediately using updateData() and then called every 5 minutes
updateData();
setInterval(updateData, 300000);

const app = express();
app.listen(3000);

app.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-Width');
  next();
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-Width');
  next();
});

app.use(express.static('dist'));

// when /driverStandings.json is accessed with a GET request the ./json/driverStandings.json file is sent back to the user
app.get('/driverStandings.json', function(req, res) {
  fs.readFile('./json/driverStandings.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.json(JSON.parse(data));
  });
});

app.get('/constructorStandings.json', function(req, res) {
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
  let settings = { method: 'Get' };

  fetch(api_driver_url, settings)
    .then(res => res.json())
    .then(json => {
      let jsonContent = JSON.stringify(json);

      fs.writeFile('./json/driverStandings.json', jsonContent, 'utf8', function(
        err
      ) {
        if (err) {
          console.log('Error writing driver JSON to file');
          return console.log(err);
        }
      });
    });

  fetch(api_constructor_url, settings)
    .then(res => res.json())
    .then(json => {
      let jsonContent = JSON.stringify(json);

      fs.writeFile(
        './json/constructorStandings.json',
        jsonContent,
        'utf8',
        function(err) {
          if (err) {
            console.log('Error writing constructor JSON to file');
            return console.log(err);
          }
        }
      );
    });
}

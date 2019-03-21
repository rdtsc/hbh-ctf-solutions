'use strict';

const temp           = require('temp'),
      cheerio        = require('cheerio'),
      request        = require('request'),
      requestPromise = require('request-promise-native'),
      decodeBarcode  = require('javascript-barcode-reader'),
      isBarcodeValid = require('barcode-validator');

temp.track();

const challengeRootUri =
  'https://www.hellboundhackers.org/challenges/timed/timed7';

function saveBarcode()
{
  const requestOptions =
  {
    method: 'GET',
    headers: {cookie: require('~/session')},
    uri: `${challengeRootUri}/barcode.php`
  };

  return new Promise((resolve) =>
  {
    const tempStream = temp.createWriteStream();

    request(requestOptions).pipe(tempStream)
                           .on('finish', () => resolve(tempStream.path));
  });
}

async function submitSolution(barcode, validity)
{
  const requestOptions =
  {
    method: 'POST',
    simple: false,
    form: {barcode, validity},
    resolveWithFullResponse: true,
    headers: {cookie: require('~/session')},
    uri: `${challengeRootUri}/`
  };

  const response = await requestPromise(requestOptions);

  const $ = cheerio.load(response.body);

  $('.main-body').find('br')
                 .replaceWith('\n');

  return $('.main-body').text()
                        .replace(/ +/g, ' ')
                        .replace(/\n+/g, '\n')
                        .trim();
}

(async () =>
{
  const image    = await saveBarcode(),
        code     = await decodeBarcode(image, {barcode: 'EAN-13'}),
        validity = isBarcodeValid(code) ? 'valid' : 'invalid';

  console.log(await submitSolution(code, validity));
})();

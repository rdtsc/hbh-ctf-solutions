'use strict';

const assert  = require('assert'),
      cheerio = require('cheerio'),
      request = require('request-promise-native');

async function fetch(requestOptions)
{
  const response = await request(requestOptions);

  assert(response.statusCode === 200);

  const $ = cheerio.load(response.body);

  $('.main-body').find('br')
                 .replaceWith('\n');

  return $('.main-body');
}

function inject(solution, requestOptions)
{
  requestOptions.method = solution.method;

  switch(requestOptions.method)
  {
    case 'GET':
    {
      requestOptions.qs = solution.data;
    }
    break;

    case 'POST':
    {
      requestOptions.form = solution.data;
      requestOptions.uri += '/index.php?check';
    }
    break;

    default: assert(false);
  }
}

function clean(mainBody)
{
  return mainBody.text()
                 .replace(/ +/g, ' ')
                 .replace(/\n+/g, '\n')
                 .trim();
}

module.exports = async (problemId, solve, respond) =>
{
  assert(solve instanceof Function);

  const requestOptions =
  {
    method: 'GET',
    simple: false,
    resolveWithFullResponse: true,
    headers: {cookie: require('~/session')},
    uri: `https://www.hellboundhackers.org/challenges/timed/timed${problemId}`
  };

  const solution = await solve(await fetch(requestOptions));

  if(typeof solution === 'undefined') return;

  inject(solution, requestOptions);

  const response = clean(await fetch(requestOptions));

  if(respond instanceof Function)
  {
    await respond(response);
  }

  else
  {
    console.log(response);
  }
};

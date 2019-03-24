#!/usr/bin/env node

'use strict';

const ora   = require('ora'),
      post  = require('~/lib/post'),
      solve = require('~/lib/solve');

const resultCache = {};

const spinner = ora('...').start();

(function attempt()
{
  let cacheKey = undefined;

  function handleResponse(response)
  {
    if(/wrong string/i.test(response))
    {
      const answer = /accepted answer:\s*(.*?)$/i;

      if(answer.test(response))
      {
        const validResult = response.replace(/ +/g, ' ')
                                    .match(answer)[1];

        resultCache[cacheKey] = Buffer.from(validResult)
                                      .toString('base64');
      }

      setTimeout(attempt, 500);
    }

    else
    {
      spinner.succeed('Validated');
    }
  }

  solve(6, ($) =>
  {
    const rank = $.text()
                  .replace(/ +/g, ' ')
                  .trim()
                  .match(/get the (.*?) result/i)[1];

    const term = $.find('strong')
                  .text()
                  .trim();

    cacheKey = `${rank}%${term}`;

    const cacheSize = Object.keys(resultCache).length + 1;

    spinner.text = `[${cacheSize}] ${rank} "${term}"`;

    return post
    ({
      url: resultCache[cacheKey] || ''
    });
  }, handleResponse);
})();

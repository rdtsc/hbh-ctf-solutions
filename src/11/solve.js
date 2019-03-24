#!/usr/bin/env node

'use strict';

const _           = require('lodash'),
      post        = require('~/lib/post'),
      solve       = require('~/lib/solve'),
      cheerio     = require('cheerio'),
      interpolate = require('interpolating-polynomial');

solve(11, ($) =>
{
  const x = +$.text()
              .replace(/ +/g, ' ')
              .trim()
              .match(/calculate f\((.*?)\)/i)[1];

  const toScalar = (_, cell) =>
    +cheerio.load(cell).text();

  const values = $.find('td')
                  .map(toScalar);

  const points = _.chunk(values, 2)
                  .slice(1);

  const f = interpolate(points);

  return post
  ({
    answer: f(x)
  });
});

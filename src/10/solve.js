#!/usr/bin/env node

'use strict';

const gcd   = require('compute-gcd'),
      post  = require('~/lib/post'),
      solve = require('~/lib/solve');

solve(10, ($) =>
{
  const values = $.text()
                  .replace(/ +/g, ' ')
                  .trim()
                  .match(/integers: (\d+) (\d+) (\d+) (\d+)/i);

  return post
  ({
    answer: gcd(values.splice(1, 4).map(Number))
  });
});

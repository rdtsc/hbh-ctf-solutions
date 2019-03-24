#!/usr/bin/env node

'use strict';

const post  = require('~/lib/post'),
      solve = require('~/lib/solve');

solve(2, ($) =>
{
  const payload = $.text()
                   .replace(/ +/g, ' ')
                   .trim()
                   .match(/string is: ([\da-f]+)/i)[1]
                   .split('')
                   .filter(Number)
                   .map(Number);

  return post
  ({
    ans: payload.reduce((lhs, rhs) => lhs + rhs)
  });
});

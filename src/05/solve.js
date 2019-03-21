'use strict';

const get   = require('~/lib/get'),
      solve = require('~/lib/solve');

solve(5, ($) =>
{
  const target = 1337;

  const value = +$.text()
                  .replace(/ +/g, ' ')
                  .trim()
                  .match(/make (\d+) into/i)[1];

  const spread = Math.abs(value - target);

  const preposition = value > target ? 'minus' : 'plus';

  return get
  ({
    password: `${preposition}_${spread}`
  });
});

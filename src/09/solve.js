#!/usr/bin/env node

'use strict';

const post   = require('~/lib/post'),
      solve  = require('~/lib/solve'),
      BigNum = require('bn.js');

function fibonacciSeries(targetCount, seedA, seedB)
{
  const terms =
  [
    new BigNum(seedA),
    new BigNum(seedB)
  ];

  for(let i = 2; i < targetCount; ++i)
  {
    let term =
      new BigNum(terms[i - 1]);

    terms.push(term.add(terms[i - 2]));
  }

  return terms;
}

solve(9, ($) =>
{
  const terms = $.text()
                 .replace(/ +/g, ' ')
                 .trim()
                 .match(/first (\d+) numbers .*? with (\d+) and (\d+)/i);

  const count = +terms[1],
        seed  = [terms[2], terms[3]];

  const bigSum = (lhs, rhs) => lhs.add(rhs);

  const series = fibonacciSeries(count, seed[0], seed[1]);

  return post
  ({
    answer: series.reduce(bigSum, new BigNum(0))
                  .toString()
  });
});

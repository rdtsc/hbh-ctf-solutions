'use strict';

const post  = require('~/lib/post'),
      solve = require('~/lib/solve');

solve(8, ($) =>
{
  const terms = $.text()
                 .replace(/ +/g, ' ')
                 .trim()
                 .match(/a\s*\+\s*(\d+)\s*x\s*(\d+)\s*=\s*(\d+)/i);

  const b = terms[1],
        c = terms[2],
        d = terms[3];

  const lhs = b * c,
        rhs = d - lhs;

  return post
  ({
    ans: rhs
  });
});

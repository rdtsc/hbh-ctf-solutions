#!/usr/bin/env node

'use strict';

const _     = require('lodash'),
      post  = require('~/lib/post'),
      solve = require('~/lib/solve');

solve(4, ($) =>
{
  const scrambled = $.find('strong')
                     .last()
                     .text()
                     .trim()
                     .split('');

  const lhs = _.first(scrambled),
        rhs = _.last(scrambled);

  const mid = _(scrambled.slice(1, -1)).chunk(2)
                                       .map(seq => seq.reverse())
                                       .flatten()
                                       .join('');

  return post
  ({
    ans: `${lhs}${rhs}${mid}`
  });
});

'use strict';

const get   = require('~/lib/get'),
      solve = require('~/lib/solve');

solve(1, ($) =>
{
  const payload = $.text()
                   .replace(/ +/g, ' ')
                   .match(/random string: (.*?) and/i)[1];

  return get
  ({
    b64: Buffer.from(payload, 'base64').toString()
  });
});

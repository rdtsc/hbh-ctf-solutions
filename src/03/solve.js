'use strict';

const post    = require('~/lib/post'),
      solve   = require('~/lib/solve'),
      assert  = require('assert'),
      crypto  = require('crypto'),
      request = require('request-promise-native');

async function getRainbowTable()
{
  const uri =
    'https://www.hellboundhackers.org/challenges/timed/timed3/data.txt';

  const words = await request(uri);

  const md5 = (string) => crypto.createHash('md5')
                                .update(string)
                                .digest('hex')
                                .toLowerCase();

  const toKvPairs = (object, data) =>
  {
    object[data[0]] = data[1];
    return object;
  };

  return words.split(',')
              .map(word => word.trim())
              .map(word => [md5(word), word])
              .reduce(toKvPairs, {});
}

(async () =>
{
  const rainbowTable = await getRainbowTable();

  solve(3, ($) =>
  {
    const hash = $.text()
                  .replace(/ +/g, ' ')
                  .trim()
                  .match(/string is: ([\da-f]+)/i)[1]
                  .toLowerCase();

    assert(hash in rainbowTable);

    return post
    ({
      ans: rainbowTable[hash]
    });
  });
})();

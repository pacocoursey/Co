# Co

Tiny, simple, and unassuming CLI helper for node

## Install

```
$ npm install pacocoursey/co
```

## Usage

```js
const Co = require('@pacocoursey/co');

Co.command('help')
  .description('output usage information')
  .alias(['-h', '--help'])
  .action(() => { console.log('your help message here'); });

Co.parse();
```

## Related

- [Commander](https://github.com/tj/commander.js) - OG CLI parsing for node

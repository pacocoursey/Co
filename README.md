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

#

<p align="center">
  <a href="http://paco.sh"><img src="https://raw.githubusercontent.com/pacocoursey/pacocoursey.github.io/master/footer.png" height="300"></a>
</p>

#!/usr/bin/env node
const chalk = require('chalk');
const Co = require('@pacocoursey/co');

const { log } = console;

const help = (icon, name) => `
  ${icon}  ${chalk.bold(name)}

  ${chalk.bold('Usage')}:

    ${name} [<flags>] <command> [<args> ...]

  ${chalk.bold('Flags')}:

    -h, --help\t\tOutput usage information.
    -v, --version\tShow application version.

  ${chalk.bold('Commands')}:

    help\t\tDisplay this help message.
    list\t\tList the active projects.

  ${chalk.bold('Examples')}:

    Create a new project.
    $ ${name} create

    List the active projects.
    $ ${name} list

`;

const h = () => {
  log(help('∞', 'focus'));
};

const l = () => {
  log('list');
};

Co.flag('-p')
  .alias(['--pep', '--peppers'])
  .description('Add peppers')
  .action(() => { log('pppppp'); });

Co.flag('-s')
  .action(() => { log('ssss'); });

Co.command('version')
  .description('show application version')
  .alias(['-v', '--version'])
  .action(() => { console.log(Co.getVersion()); });

Co.command('help')
  .description('super hot fire man')
  .alias(['-h', '--help'])
  .action(h);

Co.command('list')
  .description('list stuff')
  .alias(['-l', '--list'])
  .action(l);

Co.version('9.9.9');

Co.parse();

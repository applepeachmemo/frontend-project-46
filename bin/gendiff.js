#!/usr/bin/env node

const commander = require('commander');

commander
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information');
  
commander.parse(process.argv);
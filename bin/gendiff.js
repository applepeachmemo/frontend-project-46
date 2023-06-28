#!/usr/bin/env node

const { program } = require('commander');

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information');

program.parse();
  


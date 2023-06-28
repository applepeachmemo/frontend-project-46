#!/usr/bin/env node
import program from 'commander';

program
  .version('0.2.1')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
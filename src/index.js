import { cwd } from 'node:process';
import fs from 'fs';
import { resolve } from 'node:path';
import parsesFile from './parsers.js';
import getTree from './getTree.js';
import formatter from './formatters/index.js';

const getFullFilePath = (filepath) => resolve(cwd(), filepath);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathFile1 = getFullFilePath(filepath1);
  const pathFile2 = getFullFilePath(filepath2);

  const data1 = readFile(pathFile1);
  const data2 = readFile(pathFile2);

  const tree = getTree(
    parsesFile(data1),
    parsesFile(data2),
  );

  return formatter(tree, formatName);
};

export default gendiff;

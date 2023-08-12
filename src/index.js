import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'node:path';
import parsesFile from './parsers.js';
import getTree from './getTree.js';
import formatter from './formatters/index.js';

const getFullFilePath = (filepath) => resolve(cwd(), filepath);

const getFormat = (filepath) => extname(filepath).substring(1);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const getFile = (filepath) => {
  const fullFilePath = getFullFilePath(filepath);
  const format = getFormat(filepath);
  const data = readFile(fullFilePath);
  return { format, data };
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);

  const parsedData1 = parsesFile(file1.data, file1.format);
  const parsedData2 = parsesFile(file2.data, file2.format);

  const informationDiff = getTree(parsedData1, parsedData2);

  return formatter(informationDiff, formatName);
};

export default gendiff;

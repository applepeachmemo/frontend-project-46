import url from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const getFilePair = (fileNum) => {
  const filepath1 = getFixturePath(`file${fileNum}.json`);
  const filepath2 = getFixturePath(`file${fileNum + 1}.json`);
  return { filepath1, filepath2 };
};

describe('comparing files', () => {
  test('simple using', () => {
    const { filepath1, filepath2 } = getFilePair(1);
    const file1OutputDefault = readFile('stylish.txt');
    expect(gendiff(filepath1, filepath2)).toEqual(file1OutputDefault);
  });

  test('plain format', () => {
    const { filepath1, filepath2 } = getFilePair(1);
    const file1OutputPlain = readFile('plain.txt');
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(file1OutputPlain);
  });

  test('json format', () => {
    const { filepath1, filepath2 } = getFilePair(1);
    const file1OutputJson = readFile('json.txt');
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(file1OutputJson);
  });
});

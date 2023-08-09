import url from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('comparing files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const expectedStylish = readFile('stylish.txt');
  const expectedPlain = readFile('plain.txt');
  const expectedJson = readFile('json.txt');

  test('default format (stylish)', () => {
    expect(gendiff(filepath1, filepath2)).toEqual(expectedStylish);
  });

  test('plain format', () => {
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  });

  test('json format', () => {
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  });
});

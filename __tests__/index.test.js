import url from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('comparing files', () => {
  const filepath1Json = getFixturePath('file1.json');
  const filepath2Json = getFixturePath('file2.json');
  const filepath1Yaml = getFixturePath('file1.yaml');
  const filepath2Yaml = getFixturePath('file2.yaml');

  const expectedStylish = readFile('stylish.txt');
  const expectedPlain = readFile('plain.txt');
  const expectedJson = readFile('json.txt');

  test('json format', () => {
    expect(gendiff(filepath1Json, filepath2Json)).toEqual(expectedStylish);
    expect(gendiff(filepath1Json, filepath2Json, 'stylish')).toEqual(expectedStylish);
    expect(gendiff(filepath1Json, filepath2Json, 'plain')).toEqual(expectedPlain);
    expect(gendiff(filepath1Json, filepath2Json, 'json')).toEqual(expectedJson);
  });

  test('yaml format', () => {
    expect(gendiff(filepath1Yaml, filepath2Yaml)).toEqual(expectedStylish);
    expect(gendiff(filepath1Yaml, filepath2Yaml, 'stylish')).toEqual(expectedStylish);
    expect(gendiff(filepath1Yaml, filepath2Yaml, 'plain')).toEqual(expectedPlain);
    expect(gendiff(filepath1Yaml, filepath2Yaml, 'json')).toEqual(expectedJson);
  });
});

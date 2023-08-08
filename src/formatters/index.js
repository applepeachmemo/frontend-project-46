import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatter = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return formatPlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(
        `The ${formatName} format is not supported.\n Supported formats: stylish, plain, json`,
      );
  }
};

export default formatter;

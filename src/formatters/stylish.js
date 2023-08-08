import _ from 'lodash';

const spacesCount = 4;
const replacer = ' ';

const getSpaces = (depth, isFull) => {
  const indentSize = depth * spacesCount;
  const spacesToUse = isFull ? indentSize : indentSize - 2;
  return replacer.repeat(spacesToUse);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }

  const lines = Object.entries(data).map(([key, value]) => {
    const indent = getSpaces(depth + 1, false);
    const keyValueString = `${key}: ${stringify(value, depth + 1)}`;
    return `${indent}${keyValueString}`;
  });

  return `{\n${lines.join('\n')}\n${getSpaces(depth, true)}}`;
};

const iter = (diff, depth = 1) => diff.map((node) => {
  const indent = getSpaces(depth, true);

  switch (node.type) {
    case 'deleted':
      return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'added':
      return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed': {
      const value1String = stringify(node.value1, depth);
      const value2String = stringify(node.value2, depth);
      return `${indent}- ${node.key}: ${value1String}\n${indent}+ ${node.key}: ${value2String}`;
    }
    case 'unchanged':
      return `${indent}${node.key}: ${stringify(node.value, depth)}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${indent}${node.key}: {\n${lines.join('\n')}\n${indent}}`;
    }
    default:
      throw new Error(`Unknown type of node '${node.type}'.`);
  }
});

const formatStylish = (tree) => {
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};

export default formatStylish;

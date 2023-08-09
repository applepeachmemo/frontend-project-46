import _ from 'lodash';

const spacesCount = 4;
const replacer = ' ';

const getIndent = (depth, isFull) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(isFull ? indentSize : indentSize - 2);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(
    ([key, value]) => `${getIndent(depth + 1, true)}${key}: ${stringify(value, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getIndent(depth, true)}}`;
};

const iter = (diff, depth = 1) => diff.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${getIndent(depth, false)}- ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'added':
      return `${getIndent(depth, false)}+ ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'changed': {
      return `${getIndent(depth, false)}- ${node.key}: ${stringify(
        node.value1,
        depth,
      )}\n${getIndent(depth, false)}+ ${node.key}: ${stringify(
        node.value2,
        depth,
      )}`;
    }
    case 'unchanged':
      return `${getIndent(depth, true)}${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${getIndent(depth, true)}${node.key}: {\n${lines.join(
        '\n',
      )}\n${getIndent(depth, true)}}`;
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

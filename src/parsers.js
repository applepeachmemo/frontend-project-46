import YAML from 'js-yaml';

export default (data, format = 'json') => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return YAML.load(data);
    case 'yaml':
      return YAML.load(data);
    default:
      throw new Error(`'Unknown format! ${format}'`);
  }
};

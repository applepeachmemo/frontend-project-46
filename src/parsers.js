import YAML from 'js-yaml';

export default (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return YAML.load(data);
    case 'plain':
      return data;
    default:
      throw new Error(`Unknown format! ${format}`);
  }
};

export const UniquePlugin = {
  mongoosePlugin: require('mongoose-unique-validator'),
  options: { message: 'Error, expected {PATH} to be unique.' },
};
export * from './paranoid.plugin';

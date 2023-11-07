import fs from 'fs';
import { createProgram, createParser, SchemaGenerator, createFormatter, Config } from 'ts-json-schema-generator';
import { MyFunctionTypeFormatter } from './my-function-formatter';

const config: Config = {
  path: 'joktec.config.{js|ts}',
  tsconfig: './tsconfig.json',
  type: 'JoktecConfig',
  strictTuples: true,
  skipTypeCheck: true,
  additionalProperties: true,
};

const formatter = createFormatter(config, (fmt, circularReferenceTypeFormatter) => {
  fmt.addTypeFormatter(new MyFunctionTypeFormatter(circularReferenceTypeFormatter));
});
const program = createProgram(config);
const parser = createParser(program, config);
const generator = new SchemaGenerator(program, parser, formatter, config);
const schema = generator.createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);

const output_path = './config.schema.json';
fs.writeFile(output_path, schemaString, err => {
  if (err) throw err;
});

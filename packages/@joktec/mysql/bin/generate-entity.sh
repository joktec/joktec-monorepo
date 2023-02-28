#!/usr/bin/env node

const { camelCase, upperFirst, kebabCase, filter, orderBy } = require('lodash');
const fs = require('fs');
const knex = require('knex');
const pluralize = require('pluralize');
const schemaInspector = require('knex-schema-inspector');
const { Command } = require('commander');

const program = new Command();
program
  .version('0.0.1')
  .option('-m, --mysql-url <string>', 'MySQL URL')
  .option('-t, --table-name <string>', 'Table name')
  .option('-e, --only-entity', 'Only Entity');

program.parse(process.argv);
const options = program.opts();

// Connect to DB and get inspector
const connUrl = options.mysqlUrl;
const database = knex({ client: 'mysql', connection: connUrl });
const inspector = schemaInspector.SchemaInspector(database);

// Generate Entity
const writeEntity = async (tableName) => {
  const entityPrefix = pluralize(tableName.split('_')[0]);
  const dir = `./src/entities/${entityPrefix}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const filePath = `${dir}/${kebabCase(tableName)}.entity.ts`;

  const columns = await inspector.columnInfo(tableName);
  const className = upperFirst(camelCase(tableName + 'Entity'));
  const classMapper = upperFirst(camelCase(tableName + 'Mapper'));

  const lines = [
    `import { BaseEntity, MysqlMapper, linkTransform, toBool } from '@joktec/core';`,
    `import { ClassTransformOptions, Expose, instanceToPlain, plainToInstance, Transform } from 'class-transformer';`,
    `import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';`,
    ``,
    `@Expose({ name: '${tableName}' })`,
    `export class ${className} extends BaseEntity {`,
    `\tconstructor(payload: Partial<${className}>) {`,
    `\t\tsuper(payload);`,
    `\t\tObject.assign(this, { ...payload });`,
    `\t}`,
  ];

  columns.map(column => {
    const { name, data_type, is_nullable, is_primary_key } = column;
    lines.push(`\t@Expose({ name: '${name}' })`);
    lines.push(is_nullable ? '\n@IsOptional()' : `\t@IsNotEmpty()`);
    const optional = is_nullable ? '?' : '!';
    const tsType =
      (['bit', 'boolean'].includes(data_type) && 'boolean') ||
      (['varchar', 'text', 'longtext'].includes(data_type) && 'string') ||
      (['int', 'tinyint', 'bigint', 'decimal', 'double'].includes(data_type) && 'number') ||
      (data_type.includes('unsigned') && 'number') ||
      (['datetime', 'date', 'timestamp', 'time'].includes(data_type) && 'Date') ||
      (['json'].includes(data_type) && 'any') ||
      'unknown';

    const validator =
      (tsType == 'string' && `\t@IsString()`) ||
      (tsType == 'number' && `\t@IsInt()`) ||
      (tsType == 'Date' && `\t@IsDate()`) ||
      (tsType == 'boolean' && `\t@IsBoolean()\n\t@Transform(({ value }) => toBool(value), { toClassOnly: true })`) ||
      (tsType == 'any' && `\t@Transform(({ value }) => JSON.parse(value), { toClassOnly: true })\n\t@Transform(({ value }) => JSON.stringify(value), { toPlainOnly: true })`) ||
      undefined;

    if (validator) {
      lines.push(validator);
    }

    if (is_primary_key) {
      lines.push(`\t_id: ${tsType};`);
    } else {
      lines.push(`\t${camelCase(name)}${optional}: ${tsType};`);
    }

    lines.push('');
  });
  lines.push(`@Expose({ name: 'sqlId', toClassOnly: true })\nget sqlId() {return this._id;}`);
  lines.push('}');

  // Generate Mapper
  const mapperContent = `
    export class ${classMapper} extends MysqlMapper<${className}> {
        toPersistence = (domainModel: ${className}, opts?: ClassTransformOptions) => instanceToPlain<${className}>(domainModel, opts);
        toDomain = (persistenceModel: any, opts?: ClassTransformOptions): ${className} => plainToInstance<${className}, any>(${className}, persistenceModel, opts);
    }
  `;
  lines.push(mapperContent);

  // Create file
  fs.writeFileSync(filePath, lines.join('\n'));
  console.log('CREATE FILE:', filePath);

  // Update sub index
  const appendContent = `export * from './${kebabCase(tableName)}.entity';`;
  const indexPath = `${dir}/index.ts`;
  if (!fs.existsSync(indexPath)) {
    fs.closeSync(fs.openSync(indexPath, 'w'));
    console.log('CREATE FILE:', indexPath);
  }

  const indexContent = fs.readFileSync(indexPath).toString();
  if (!indexContent.includes(appendContent)) {
    fs.appendFileSync(indexPath, appendContent);
    console.log('UPDATE FILE:', indexPath);
  }

  // Update entity index
  const appendIndex = `export * from './${entityPrefix}';`;
  const rootIndexPath = `./src/entities/index.ts`;
  const rootIndexContent = fs.readFileSync(rootIndexPath).toString();
  if (!rootIndexContent.includes(appendIndex)) {
    fs.appendFileSync(rootIndexPath, appendIndex);
    console.log('UPDATE FILE:', rootIndexPath);
  }
};

const writeRepo = async (tableName) => {
  const entityPrefix = pluralize(tableName.split('_')[0]);
  const dir = `./src/repositories/${entityPrefix}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const filePath = `${dir}/${kebabCase(tableName)}.repo.ts`;

  // Check primary key
  const columns = await inspector.columnInfo(tableName);
  const primaryKey = filter(columns, c => c.is_primary_key).pop();
  const tsType =
    (['varchar', 'text', 'longtext'].includes(primaryKey?.data_type) && 'string') ||
    (['int', 'tinyint', 'bigint', 'decimal', 'double', 'bit'].includes(primaryKey?.data_type) && 'number') ||
    (primaryKey?.data_type.includes('unsigned') && 'number') ||
    'any';

  // Create file
  const entityName = upperFirst(camelCase(tableName + 'Entity'));
  const className = upperFirst(camelCase(tableName + 'Repo'));
  const classMapper = upperFirst(camelCase(tableName + 'Mapper'));

  const fileContent = `
      import { Injectable, MysqlRepo, MysqlService } from '@joktec/core';
      import { ${entityName}, ${classMapper} } from '../../entities';

      @Injectable()
      export class ${className} extends MysqlRepo<${entityName}, ${tsType}> {
        constructor(protected mysqlService: MysqlService) {
          super('${tableName}', mysqlService, new ${classMapper}());
        }
      }
    `;
  fs.writeFileSync(filePath, fileContent);
  console.log('CREATE FILE:', filePath);

  // Update index
  const appendContent = `export * from './${kebabCase(tableName)}.repo';`;
  const indexPath = `${dir}/index.ts`;
  if (!fs.existsSync(indexPath)) {
    fs.closeSync(fs.openSync(indexPath, 'w'));
    console.log('CREATE FILE:', indexPath);
  }

  const indexContent = fs.readFileSync(indexPath).toString();
  if (!indexContent.includes(appendContent)) {
    fs.appendFileSync(indexPath, appendContent);
    console.log('UPDATE FILE:', indexPath);
  }

  // Update repositories index
  const appendIndex = `export * from './${entityPrefix}';`;
  const rootIndexPath = `./src/repositories/index.ts`;
  const rootIndexContent = fs.readFileSync(rootIndexPath).toString();
  if (!rootIndexContent.includes(appendIndex)) {
    fs.appendFileSync(rootIndexPath, appendIndex);
    console.log('UPDATE FILE:', rootIndexPath);
  }
};

(async () => {
  console.log(`Generate from table:`, options.tableName);

  if (!fs.existsSync('./src/entities/')) fs.mkdirSync('./src/entities/');
  await writeEntity(options.tableName);

  if (!fs.existsSync('./src/repositories/')) fs.mkdirSync('./src/repositories/');
  await writeRepo(options.tableName);
})().then(() => process.exit(0));

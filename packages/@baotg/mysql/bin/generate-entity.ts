#!/usr/bin/env ts-node

import { camelCase, upperFirst, kebabCase, filter } from 'lodash';
import * as fs from 'fs';
import knex from 'knex';
import pluralize from 'pluralize';
import schemaInspector from 'knex-schema-inspector';

// Connect to DB and get inspector
const connectionUrl = 'mysql://root:FZyNFRNUcnuDvJD5@mysql-jobhop-dev.jobhopin.com:3306/jobhop_dev';
const database = knex({ client: 'mysql', connection: connectionUrl });
const inspector = schemaInspector(database);

// Generate Entity
async function writeEntity(tableName: string) {
  const entityPrefix = pluralize(tableName.split('_')[0]);
  const dir = `./src/entities/${entityPrefix}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filePath = `${dir}/${kebabCase(tableName)}.entity.ts`;
  // if (fs.existsSync(filePath)) return;

  const columns = await inspector.columnInfo(tableName);
  const className = upperFirst(camelCase(tableName + 'Entity'));
  const classMapper = upperFirst(camelCase(tableName + 'Mapper'));
  const lines: string[] = [
    `import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';`,
    `import { BaseEntity } from '../base.entity';`,
    `import { MysqlMapper } from '../../models';`,
    ``,
    `@Expose({ name: '${tableName}' })`,
    `export class ${className} extends BaseEntity {`,
  ];

  columns.map(column => {
    const { name, data_type, is_nullable } = column;
    lines.push(`\t@Expose({ name: '${name}' })`);
    lines.push(is_nullable ? '\n@IsOptional()' : `\t@IsNotEmpty()`);

    const optional = is_nullable ? '?' : '!';
    const tsType =
      (['varchar', 'text', 'longtext'].includes(data_type) && 'string') ||
      (['int', 'tinyint', 'bigint', 'decimal', 'double'].includes(data_type) && 'number') ||
      (['datetime', 'date', 'timestamp', 'time'].includes(data_type) && 'Date') ||
      'unknown';
    const validator =
      (tsType === 'string' && `\t@IsString()`) ||
      (tsType === 'number' && `\t@IsInt()`) ||
      (tsType === 'Date' && `\t@IsDate()`) ||
      undefined;
    if (validator) lines.push(validator);

    lines.push(`\t${camelCase(name)}${optional}: ${tsType};`);
    lines.push('');
  });
  lines.push('}');

  // Generate Mapper
  const mapperContent = `
    export class ${classMapper} extends MysqlMapper<${className}> {
        toPersistence = (domainModel: ${className}) => instanceToPlain<${className}>(domainModel);
        toDomain = (persistenceModel: any): ${className} => plainToInstance<${className}, any>(${className}, persistenceModel);
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
}

async function writeRepo(tableName: string) {
  const entityPrefix = pluralize(tableName.split('_')[0]);
  const dir = `./src/repositories/${entityPrefix}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filePath = `${dir}/${kebabCase(tableName)}.repo.ts`;
  // if (fs.existsSync(filePath)) return;

  // Check primary key
  const columns = await inspector.columnInfo(tableName);
  const primaryKey = filter(columns, c => c.is_primary_key).pop();
  const tsType =
    (['varchar', 'text', 'longtext'].includes(primaryKey?.data_type) && 'string') ||
    (['int', 'tinyint', 'bigint', 'decimal', 'double'].includes(primaryKey?.data_type) && 'number') ||
    'any';

  // Create file
  const entityName = upperFirst(camelCase(tableName + 'Entity'));
  const className = upperFirst(camelCase(tableName + 'Repo'));
  const classMapper = upperFirst(camelCase(tableName + 'Mapper'));
  const fileContent = `
      import { Injectable } from '@baotg/core';
      import { ${entityName}, ${classMapper} } from '../../entities';
      import { MysqlRepo } from '../mysql.repo';
      import { MysqlService } from '../../mysql.service';

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

  // Update entity index
  const appendIndex = `export * from './${entityPrefix}';`;
  const rootIndexPath = `./src/repositories/index.ts`;
  const rootIndexContent = fs.readFileSync(rootIndexPath).toString();
  if (!rootIndexContent.includes(appendIndex)) {
    fs.appendFileSync(rootIndexPath, appendIndex);
    console.log('UPDATE FILE:', rootIndexPath);
  }
}

(async () => {
  const tables: string[] = await inspector.tables();
  for (const tableName of tables) {
    if (tableName.split('_')[0] !== 'job') {
      continue;
    }
    console.log(`Generate from table:`, tableName);
    await writeEntity(tableName);
    await writeRepo(tableName);
    console.log(`*** ------------------- ***`);
  }
})().then(() => process.exit(0));

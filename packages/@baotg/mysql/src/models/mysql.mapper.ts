import { ClassTransformOptions } from 'class-transformer/types/interfaces';
import { validateSync, ValidationError } from 'class-validator';

export abstract class MysqlMapper<D, P = any> {
  /**
   * It is your domain entities. This is where OOD fits into your code and where you code business logic.
   * DM in this context does not necessarily mean fully fledged Domain Model from DDD.
   * @param persistenceModel
   * @param opts {ClassTransformOptions}
   */
  abstract toDomain(persistenceModel: P, opts?: ClassTransformOptions): D;

  /**
   * For the sake of this article I am going to call the set of ORM entities in a project the Persistence Model of that project.
   * It is the set of entities mapped to your database using an ORM framework.
   * @param domainModel
   * @param opts {ClassTransformOptions}
   */
  abstract toPersistence(domainModel: D, opts?: ClassTransformOptions): P;

  /**
   * Check is domain model have any errors
   * @param domainModel
   * @protected
   */
  protected validate(domainModel: D): string[] {
    const errors: ValidationError[] = validateSync(domainModel as any);
    return errors.reduce((res, err) => res.concat(Object.values(err.constraints)), []);
  }
}

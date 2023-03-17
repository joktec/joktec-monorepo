import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer/types/interfaces';
import { validateSync, ValidationError } from 'class-validator';

export abstract class BaseMapper<D, P extends Record<string, any> = any> {
  protected constructor(protected domainModel: ClassConstructor<D>) {}

  /**
   * It is your domain entities. This is where OOD fits into your code and where you code business logic.
   * DM in this context does not necessarily mean fully fledged Domain Model from DDD.
   * @param persistenceModel
   * @param opts {ClassTransformOptions}
   */
  public toDomain(persistenceModel: P, opts?: ClassTransformOptions): D {
    return plainToInstance(this.domainModel, persistenceModel, opts);
  }

  /**
   * For the sake of this article I am going to call the set of ORM entities in a project the Persistence Model of that project.
   * It is the set of entities mapped to your database using an ORM framework.
   * @param domainModel
   * @param opts {ClassTransformOptions}
   */
  public toPersistence(domainModel: D, opts?: ClassTransformOptions): P {
    return instanceToPlain<D>(domainModel, opts) as P;
  }

  /**
   * Check is domain model have any errors
   * @param domainModel
   * @protected
   */
  public validate(domainModel: D): string[] {
    const errors: ValidationError[] = validateSync(domainModel as any);
    return errors.reduce((res, err) => res.concat(Object.values(err.constraints)), []);
  }
}

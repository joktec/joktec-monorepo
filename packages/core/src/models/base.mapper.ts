import { ClassTransformOptions, instanceToPlain, plainToInstance, validateSync, ValidationError } from '@joktec/utils';
import { Constructor, Entity } from './base.dto';

export abstract class BaseMapper<D, P extends Entity = any> {
  protected constructor(protected domainModel: Constructor<D>) {}

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

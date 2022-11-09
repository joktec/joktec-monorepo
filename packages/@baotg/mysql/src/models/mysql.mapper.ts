export abstract class MysqlMapper<D, P = any> {
  /**
   * It is your domain entities. This is where OOD fits into your code and where you code business logic.
   * DM in this context does not necessarily mean fully fledged Domain Model from DDD.
   * @param persistenceModel
   */
  abstract toDomain(persistenceModel: P): D;

  /**
   * For the sake of this article I am going to call the set of ORM entities in a project the Persistence Model of that project.
   * It is the set of entities mapped to your database using an ORM framework.
   * @param domainModel
   */
  abstract toPersistence(domainModel: D): P;
}

import { Where, WhereField } from './models';
import { Knex } from 'knex';

export const buildQuery = (qb: Knex.QueryBuilder, where: Where): void => {
  where.map((clause: WhereField) => {
    const [column, operation, value, not] = clause;
    if (!not) {
      qb.whereNot(column, operation, value);
    } else {
      qb.where(column, operation, value);
    }
  });
};

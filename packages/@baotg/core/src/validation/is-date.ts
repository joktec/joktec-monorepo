import moment from 'moment';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsYYYYMMDD(maxDate?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsYYYYMMDD',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: `${propertyName} provide with YYYY-MM-DD format and less than ${
          maxDate ?? moment().add('days', 2).utc().format('YYYY-MM-DD')
        }`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /^[1-9]\d*-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
          const max = maxDate ?? moment().add('days', 1).utc().format('YYYY-MM-DD');

          return (
            typeof value === 'string' && regex.test(value) && moment(value, 'YYYY-MM-DD').isValid() && value <= max
          );
        },
      },
    });
  };
}

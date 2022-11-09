import { Injectable, PipeTransform, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { isEmpty, keys, pick } from 'lodash';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  static formatErrors(errors: ValidationError[]) {
    return errors.map(error => {
      return {
        field: error.property,
        value: error.value,
        errors: error.constraints,
      };
    });
  }

  /**
   * Description: just get specified field in DTO
   * @param dto
   * @param object
   * @private
   */
  private static removeRedundantFields(dto: any, object: object) {
    const properties = keys(new dto());

    return pick(object, properties);
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (isEmpty(value)) {
      throw new HttpException(`Validation failed: No payload has been provided`, HttpStatus.BAD_REQUEST);
    }

    let object = CustomValidationPipe.removeRedundantFields(metatype, value);
    object = plainToClass(metatype, object);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        {
          error: 'Validation failed',
          details: CustomValidationPipe.formatErrors(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return object;
  }
}

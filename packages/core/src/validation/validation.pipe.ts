import { ArgumentMetadata, Injectable, PipeTransform, Type, ValidationPipe } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestException, ExceptionMessage } from '../exceptions';
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

@Injectable()
export class BaseValidationPipe extends ValidationPipe implements PipeTransform {
  constructor(options?: ValidationPipeOptions) {
    super(
      Object.assign(
        {
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: false,
        },
        options,
      ),
    );
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (isEmpty(value)) {
      throw new BadRequestException(ExceptionMessage.EMPTY_INPUT);
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metadata)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const validationErrors = await validate(object);
    if (validationErrors.length > 0) {
      const formatError = this.buildError(validationErrors);
      const message: string = formatError[Object.keys(formatError)[0]][0];
      throw new BadRequestException(message, formatError);
    }
    return value;
  }

  protected toValidate(metadata: ArgumentMetadata): boolean {
    const { metatype } = metadata;
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type || metatype === new type());
  }

  private buildError(errors: ValidationError[]): { [key: string]: string[] } {
    const result: any = {};
    errors.forEach(error => (result[error.property] = Object.values(error.constraints)));
    return result;
  }
}

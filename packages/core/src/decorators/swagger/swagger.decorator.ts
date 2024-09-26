import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { isBoolean } from 'lodash';
import { MethodNotAllowedException } from '../../exceptions';
import { HttpRequestHeader } from '../../models';
import { ApiSchemaDecorator, IApiFilterQueryOptions } from './swagger.interface';

export const ApiFilterQuery = (opts: IApiFilterQueryOptions): MethodDecorator => {
  const { textSearch = true, paginationMode = 'page', geoSearch = false, relation = false } = opts;
  const decorators: MethodDecorator[] = [
    ApiSelect('select'),
    textSearch && ApiTextSearch('keyword'),
    ApiPagination(paginationMode),
    ApiFilter(),
    ApiSorter(),
    geoSearch && ApiGeoSearch('near'),
    relation && ApiPopulate('populate'),
  ];
  return applyDecorators(...decorators.filter(d => !!d));
};

export const ApiSelect = (fieldName: string = 'select'): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiQuery({
      name: fieldName,
      required: false,
      type: String,
      description: `List return fields in json, separated by commas (e.g., \`_id,name,age\`). Returns all if not specified.`,
    })(target, propertyKey, descriptor);
  };
};

export const ApiTextSearch = (fieldName: string = 'keyword'): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiQuery({
      name: fieldName,
      required: false,
      type: String,
      description: 'Full-text search for a keyword or phrase across relevant fields.',
    })(target, propertyKey, descriptor);
  };
};

export const ApiPagination = (mode: 'page' | 'offset'): MethodDecorator => {
  if (mode === 'offset') {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })(target, propertyKey, descriptor);
      ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })(target, propertyKey, descriptor);
    };
  }
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 })(target, propertyKey, descriptor);
    ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })(target, propertyKey, descriptor);
  };
};

export const ApiFilter = (fieldName: string = 'condition'): MethodDecorator => {
  const example = JSON.stringify({ name: 'John', age: { $lte: 20 }, 'address.city': 'HCM' });
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiQuery({
      required: false,
      name: fieldName,
      style: 'deepObject',
      explode: true,
      type: 'object',
      example: {},
      description: `Condition object for filtering resource. Example: \`\`\`${example}\`\`\``,
    })(target, propertyKey, descriptor);
  };
};

export const ApiSorter = (fieldName: string = 'sort'): MethodDecorator => {
  const example = JSON.stringify({ status: 'asc', createdAt: 'desc' });
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiQuery({
      required: false,
      name: fieldName,
      style: 'deepObject',
      explode: true,
      type: 'object',
      example: {},
      description: `Object sorter to order by resource. Example: \`\`\`${example}\`\`\``,
    })(target, propertyKey, descriptor);
  };
};

export const ApiGeoSearch = (fieldName: string = 'near'): MethodDecorator => {
  const example = JSON.stringify({ location: { lat: 33.755783, lng: -116.360066, distance: 5 } });
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiQuery({
      required: false,
      name: fieldName,
      style: 'deepObject',
      explode: true,
      type: 'object',
      example: {},
      description: `Find documents near specific coordinates. Example: \`\`\`${example}\`\`\``,
    })(target, propertyKey, descriptor);
  };
};

export const ApiPopulate = (fieldName: string = 'populate'): MethodDecorator => {
  const example = JSON.stringify({ author: '*' });
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiQuery({
      required: false,
      name: fieldName,
      style: 'deepObject',
      explode: true,
      type: 'object',
      example: {},
      description: `Use this to include related data in the response. It's like pulling in extra details from other connected information. Example: \`\`\`${example}\`\`\``,
    })(target, propertyKey, descriptor);
  };
};

export const ApiFile = (fileName: string = 'file'): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: { [fileName]: { type: 'string', format: 'binary' } },
      },
    })(target, propertyKey, descriptor);
  };
};

export const ApiFiles = (fileName: string = 'files'): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: { type: 'array', items: { type: 'string', format: 'binary' } },
        },
      },
    })(target, propertyKey, descriptor);
  };
};

export const ApiSchema: ApiSchemaDecorator = ({ name }) => {
  return constructor => {
    const wrapper = class extends constructor {};
    Object.defineProperty(wrapper, 'name', { value: name, writable: false });
    return wrapper;
  };
};

export function ApiNotAllowedEndpoint(disable?: boolean): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    if (disable) {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        if (disable) throw new MethodNotAllowedException();
        return originalMethod.apply(this, args);
      };
    }
    return descriptor;
  };
}

export function ApiUseBearer(active: boolean = false): MethodDecorator & ClassDecorator {
  return (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): any => {
    if (descriptor) {
      active && ApiBearerAuth()(target, propertyKey, descriptor);
      return descriptor;
    }
    active && ApiBearerAuth()(target);
    return target;
  };
}

export function ApiUseApiKey(active: boolean | [boolean, string] = false): MethodDecorator & ClassDecorator {
  const isActive: boolean = isBoolean(active) ? active : active[0];
  const headerName: string = isBoolean(active) ? HttpRequestHeader.X_API_KEY : active[1];
  return (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): any => {
    if (descriptor) {
      isActive && ApiSecurity(headerName)(target, propertyKey, descriptor);
      return descriptor;
    }
    isActive && ApiSecurity(headerName)(target);
    return target;
  };
}

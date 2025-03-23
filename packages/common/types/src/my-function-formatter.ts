import { BaseType, Definition, FunctionType, SubTypeFormatter, TypeFormatter } from 'ts-json-schema-generator';

export class MyFunctionTypeFormatter implements SubTypeFormatter {
  // You can skip this line if you don't need childTypeFormatter
  public constructor(private childTypeFormatter: TypeFormatter) {}

  public supportsType(type: FunctionType): boolean {
    return type instanceof FunctionType;
  }

  public getDefinition(type: FunctionType): Definition {
    // Return a custom schema for the function property.
    return {
      type: 'object',
      properties: {
        isFunction: {
          type: 'boolean',
          const: true,
        },
      },
    };
  }

  // If this type does NOT HAVE children, generally all you need is:
  public getChildren(type: FunctionType): BaseType[] {
    return [];
  }

  // However, if children ARE supported, you'll need something similar to
  // this (see src/TypeFormatter/{Array,Definition,etc}.ts for some examples):
  // public getChildrenBk(type: FunctionType): BaseType[] {
  //   return this.childTypeFormatter.getChildren(type);
  // }
}

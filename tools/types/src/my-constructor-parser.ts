import { BaseType, Context, ReferenceType, StringType, SubNodeParser } from 'ts-json-schema-generator';
import ts from 'typescript';

export class MyConstructorParser implements SubNodeParser {
  supportsNode(node: ts.Node): boolean {
    return node.kind === ts.SyntaxKind.ConstructorType;
  }

  createType(node: ts.Node, context: Context, reference?: ReferenceType): BaseType | undefined {
    return new StringType(); // Treat constructors as strings in this example
  }
}

import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export function ApiOkCust<T extends Type<any>>(type: T, isArray = false) {
  const dataSchema = isArray
    ? { type: "array", items: { $ref: getSchemaPath(type) } }
    : { $ref: getSchemaPath(type) };

  return applyDecorators(
    ApiOkResponse({
      description: "Успешно",
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "success" },
          data: dataSchema,
        },
      },
    })
  );
}

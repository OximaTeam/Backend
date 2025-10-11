import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { ZodType, ZodError } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType<any>) {}

  transform(value: any) {
    try {
      return this.schema.parse(value);
    } catch (err) {
      if (err instanceof ZodError) {
        throw err;
      }
      throw err;
    }
  }
}

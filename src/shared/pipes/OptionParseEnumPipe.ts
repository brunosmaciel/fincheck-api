import { ArgumentMetadata, ParseEnumPipe, ParseUUIDPipe } from "@nestjs/common";

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T>{
  override transform(value: T, metadata: ArgumentMetadata): Promise<T> {
    if(!value) return undefined
  
    return super.transform(value,metadata)
  }
}
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { ObjectSchema } from 'joi'
import { pick } from 'lodash'

@Injectable()
export class SchemaValidationPipe<T> implements PipeTransform {
  constructor(private schema: ObjectSchema<T>) {}

  transform(value: T): T {
    const { error, value: transformedValue } = this.schema.validate(value, {
      abortEarly: false,
      allowUnknown: false,
      presence: 'required',
    })

    if (error) {
      const details = error.details.map((d) => pick(d, 'message', 'path'))
      throw new BadRequestException(details, 'Validation failed')
    }

    return transformedValue
  }
}

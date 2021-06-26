import { applyDecorators } from '@nestjs/common'
import { ApiHeader } from '@nestjs/swagger'

// TODO: How to validate headers: https://github.com/nestjs/nest/issues/4798
export function HeadersMiddleware(): unknown {
  return applyDecorators(
    ApiHeader({
      name: 'x-user-id',
      description: 'UserId header',
      required: true,
    }),
  )
}

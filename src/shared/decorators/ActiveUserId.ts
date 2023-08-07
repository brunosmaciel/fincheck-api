import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined, ExecutionContext>(
  (_data, context) => {
    const userId = context.switchToHttp().getRequest().userId;

    if (!userId) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return userId;
  },
);

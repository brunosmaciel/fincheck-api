import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  dbUrl: string;

  port?:number
}

export const env = plainToInstance(Env, {
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port?: process.env.PORT
});
const environmentErrors = validateSync(env);

if (environmentErrors.length > 0) {
  throw new Error(JSON.stringify(environmentErrors, null, 2));
}

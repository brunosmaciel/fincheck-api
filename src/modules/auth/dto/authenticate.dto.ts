import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthenticateDTO {
  @IsString({})
  @IsNotEmpty({ message: 'Email nao pode estar vazio' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

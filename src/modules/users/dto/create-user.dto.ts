import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({})
  @IsNotEmpty({ message: 'Email nao pode estar vazio' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

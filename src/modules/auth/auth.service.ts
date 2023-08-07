import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticateDTO } from './dto/authenticate.dto';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { JwtService } from '@nestjs/jwt';
import { SignupDTO } from './dto/signup.dto';
import { defaultCategories } from 'src/shared/utils/defaultCategories';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signin({ email, password }: AuthenticateDTO) {
    const user = await this.usersRepository.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
        id: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPassowrdValid = await compare(password, user.password);

    if (!isPassowrdValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateAccessToken(user.id);
    return { accessToken };
  }
  async signup({ email, password, name }: SignupDTO) {
    const emailTaken = await this.usersRepository.findByEmail(email);
    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, 10);
    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: defaultCategories,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const accessToken = await this.generateAccessToken(user.id);
    return { accessToken };
  }

  private async generateAccessToken(userId: string) {
    return await this.jwtService.signAsync({ sub: userId });
  }
}

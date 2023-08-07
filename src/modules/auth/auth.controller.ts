import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dto/authenticate.dto';
import { SignupDTO } from './dto/signup.dto';
import { isPublic } from 'src/shared/decorators/isPublic';

@isPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async authenticate(@Body() authenticateDTO: AuthenticateDTO) {
    return this.authService.signin(authenticateDTO);
  }

  @Post('signup')
  async create(@Body() signupDTO: SignupDTO) {
    return this.authService.signup(signupDTO);
  }
}

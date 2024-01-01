import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async create(@Body() createAuthDto: CreateAuthDto) {
    if(!createAuthDto.email.trim() || !createAuthDto.password.trim()) throw new BadRequestException('Email and Password must be filled');
    await this.authService.create(createAuthDto);
    return 'User created';
  }

  @Post('/login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    if(!createAuthDto.email.trim() || !createAuthDto.password.trim()) throw new BadRequestException('Email and Password must be filled');
    const user = await this.authService.login(createAuthDto);
    return {
      user: user,
      msg: 'Login successfull'
    };
  }
  @Get('/users')
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

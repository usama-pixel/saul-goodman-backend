import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}
  async create(createAuthDto: CreateAuthDto) {
    const user = await this.repo.findOne({
      where: {
        email: createAuthDto.email
      }
    })
    if (user) {
      console.log('yes')
      throw new ConflictException('User already exists');
    }
    const hashedPass = await this.hash(createAuthDto.password)
    createAuthDto.password = hashedPass
    this.repo.save(createAuthDto);
    return 'User created';
  }
  async hash(text: string) {
    const hashed = await bcrypt.hash(text, 12)
    return hashed
  }
  async encrypt(text: string) {
    const iv = randomBytes(12)
    const key = (await promisify(scrypt)(process.env.ENCRYPT_PASS, process.env.SALT, 32)) as Buffer
    const cipher = createCipheriv('aes-256-ccm', key, iv)
    const encryptedText = Buffer.concat([
      cipher.update(text),
      cipher.final()
    ])
    return encryptedText
  }

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.repo.findOne({
      where: {
        email: createAuthDto.email,
      }
    })
    const isPasswordValid = await bcrypt.compare(createAuthDto.password, user.password)
    if(!isPasswordValid) throw new NotFoundException('Invalid email or password');
    return user
  }

  findAll() {
    const users = this.repo.find({
      select: ['email', 'id']
    })
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

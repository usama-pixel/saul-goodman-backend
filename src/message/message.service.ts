import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly msgRepo: Repository<Message>,
    private readonly authRepo: AuthService
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const sender = await this.authRepo.findOne(createMessageDto.sender) 
    const receiver = await this.authRepo.findOne(createMessageDto.receiver)
    const msgEntity = new Message({
      content: createMessageDto.content,
      sender,
      receiver
    })
    const message = this.msgRepo.save(msgEntity)
    return;
  }

  findAll() {
    return `This action returns all message`;
  }

  async findOne(id: number) {
    const messages = await this.msgRepo
    .createQueryBuilder('msg')
    .leftJoinAndSelect('msg.sender', 'sender')
    .leftJoinAndSelect('msg.receiver', 'receiver')
    .select(['msg', 'sender.id', 'receiver.id'])
    .where('sender.id = :id OR receiver.id = :id', { id: id })
    .getMany();
    
    return messages;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}

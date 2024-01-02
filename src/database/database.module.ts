import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Message } from '../message/entities/message.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.getOrThrow('DB_HOST') as string,
              port: +configService.getOrThrow('DB_PORT') as number,
              username: configService.getOrThrow('DB_USER'),
              password: configService.getOrThrow('DB_PASSWORD'),
              database: 'law',
              entities: [User, Message],
              synchronize: true
            }),
            inject: [ConfigService]
        }),
    ]
})
export class DatabaseModule {
}

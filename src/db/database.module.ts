import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/auth/entities/user.entity';
import { Message } from '../src/message/entities/message.entity';
import { UserRoles } from 'src/auth/entities/user-roles.entity';
import { createDataSourceOptions } from './data-source';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            // useFactory: (configService: ConfigService) => (createDataSourceOptions(configService)),
            useFactory: createDataSourceOptions,
            inject: [ConfigService]
        }),
    ]
})
export class DatabaseModule {
}

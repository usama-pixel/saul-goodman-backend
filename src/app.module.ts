import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { ChatGateway } from './socket/chat.gateway';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD + "",
      database: 'law',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {
  constructor() {
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
  }
}
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Message } from "../message/entities/message.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageService } from "../message/message.service";

@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
})
export class ChatGateway {
    // constructor(@InjectRepository(Message) private readonly repo: Repository<Message>) {}
    constructor(private readonly msgService: MessageService) {}
    @WebSocketServer()
    server: Socket;
    users: { [key: string]: Socket } = {};

    @SubscribeMessage('register')
    handleRegister(client: Socket, data): void {
        const id = data?.id
        this.users[id] = client;
    }
    @SubscribeMessage('send_msg')
    handleSendMsg(@MessageBody() data): void {
        const {to, from, message} = data
        this.msgService.create({content: message, sender: from, receiver: to})
        const socket = this.users[to]
        if(socket) {
            socket.emit('recieve_msg', {message, from})
        }
    }
    
    @SubscribeMessage('msg')
    handleMessage(@MessageBody() message): void {
        console.log({users: this.users})
    }
}
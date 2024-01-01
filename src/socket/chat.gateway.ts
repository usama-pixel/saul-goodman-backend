import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
})
export class ChatGateway {
    @WebSocketServer()
    server: Socket;
    users: { [key: string]: Socket } = {};

    @SubscribeMessage('register')
    handleRegister(client: Socket, data): void {
        const id = data?.id
        this.users[id] = client;
        // console.log({data})
    }
    @SubscribeMessage('send_msg')
    handleSendMsg(@MessageBody() data): void {
        const {to, message} = data
        const socket = this.users[to]
        if(socket) {
            socket.emit('recieve_msg', message)
        }
    }
    
    @SubscribeMessage('msg')
    handleMessage(@MessageBody() message): void {
        console.log({users: this.users})
        // this.server.emit('message', message)
    }
    // @SubscribeMessage('recieve_msg')
    // handleRecieveMsg(@MessageBody() data): void {
    // }
}
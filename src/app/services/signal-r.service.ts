import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | undefined;
  private baseUrl: string = ' https://localhost:7188/messageHub'; // URL of the SignalR hub
  messages = signal<string[]>([]); // Store received messages

  constructor() {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl) // URL of the SignalR hub
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection started'))
      .catch(err => console.log('Error establishing SignalR connection: ' + err));
  }

  public addMessageListener = () => {
    this.hubConnection!.on('ReceiveMessage', (message: string) => {
      console.log(`Message: ${message}`);
      this.messages.update(messages => [...messages, message]); // Add received message to the array
    });
  }

  public sendMessage = (message: string) => {
    this.hubConnection!.invoke('SendMessage', message)
      .catch(err => console.error(err));
  }
}


import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../../services/signal-r.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signal-r-component',
  imports: [FormsModule],
  templateUrl: './signal-r-component.html',
  styleUrl: './signal-r-component.css',
})
export class SignalRComponent implements OnInit {
  user: string = '';
  message: string = '';

  constructor(public signalRService: SignalRService) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addMessageListener();
  }

  sendMessage() {
    this.signalRService.sendMessage(this.message);
    this.message = '';  // Clear the input after sending
  }
}
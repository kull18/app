import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { CardEventPastComponent } from "./components/card-event-past/card-event-past.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RawgService } from '../../core/services/rawg.service';
import Swal from 'sweetalert2';
import { GameServiceService } from '../../core/services/game-service.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CardEventPastComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  eventPasts: any[] = [];
  games: any[] = []; 

  constructor(private gamesService: GameServiceService) { }
  ngOnInit(): void {
    this.gamesService.getAllEventsStatus().forEach(
      data => {
        this.eventPasts = data; 
      },
    )
  }
}

import { Component } from '@angular/core';
import { GameServiceService } from '../../core/services/game-service.service';
import { eventI } from '../../core/models/EventI';
import { RawgService } from '../../core/services/rawg.service';
import { CommonModule } from '@angular/common';
import { CardEventIComponent } from '../../auth/home/components/card-event-i/card-event-i.component';
@Component({
  selector: 'app-my-events-user',
  standalone: true,
  imports: [CommonModule, CardEventIComponent],
  templateUrl: './my-events-user.component.html',
  styleUrl: './my-events-user.component.scss'
})
export class MyEventsUserComponent {
  eventsI: eventI[] = [];
  idLocal: string | null = localStorage.getItem("user");
  id: number = this.idLocal ? JSON.parse(this.idLocal).id_personal : null;
  constructor(private gameService: GameServiceService, private gamesRawg: RawgService) { }
  ngOnInit(): void {

    if (this.id !== null) {
      let number: number = +this.id;
      this.gameService.getAllEventsInI(number).subscribe(
        data => {
          this.eventsI = data;
        }
      )
    }
  }
}

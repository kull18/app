import { Component, OnInit } from '@angular/core';
import { eventI } from '../../../../core/models/EventI';
import { Input } from '@angular/core';
import { GameServiceService } from '../../../../core/services/game-service.service';
import Swal from 'sweetalert2';
import { RawgService } from '../../../../core/services/rawg.service';
@Component({
  selector: 'app-card-event-i',
  standalone: true,
  imports: [],
  templateUrl: './card-event-i.component.html',
  styleUrl: './card-event-i.component.scss'
})
export class CardEventIComponent implements OnInit {
  constructor(private gameService: GameServiceService, private RawgService: RawgService) { }
  @Input() eventI: eventI = {
    id_event: 0,
    status: '',
    game: '',
    type_game: '',
    description: '',
    date: '',
    amount: 0,
    id_personal: 0,
    name: ''
  }
  dataGames: any[] = [];
  url = '';

  ngOnInit(): void {
    this.RawgService.getGames().subscribe(
      data => {
        let flag = false;
        let current = '';
        this.dataGames = data;
        for (let index = 0; index < this.dataGames.length; index++) {

          if (this.dataGames[index].name === this.eventI.game) {
            flag = true;
            current = this.dataGames[index].background_image;
          }
        }

        if (!flag) {
          this.url = 'image-not-found.jpg'
        } else {
          this.url = current;
        }
      }
    )
  }

  deleteEventI(): void {
    let idLocal = localStorage.getItem("user");
    let id = idLocal ? JSON.parse(idLocal) : null;

    if (id !== null) {
      console.log(id)
      this.gameService.deleteEventI(id.id_personal, this.eventI.id_event).subscribe(
        dataDelete => {
          Swal.fire("Eliminar de evento", "se logro eliminar del evento", "success");
        },

        error => {
          Swal.fire("Eliminar del evento", "No se logro eliminar del evento", "error")
        }
      )
    }

  }
}

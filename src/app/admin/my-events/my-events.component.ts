import { Component, OnInit } from '@angular/core';
import { MyEventComponent } from "../../auth/home/components/my-event/my-event.component";
import { Event } from '../../core/models/Events';
import { GameServiceService } from '../../core/services/game-service.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CardEventIComponent } from "../../auth/home/components/card-event-i/card-event-i.component";
import { eventI } from '../../core/models/EventI';
import { RawgService } from '../../core/services/rawg.service';
@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [MyEventComponent, CommonModule, CardEventIComponent],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent implements OnInit {
  data: any[] = [];
  eventsI: eventI[] = [];
  idLocal: string | null = localStorage.getItem("user");
  id: number = this.idLocal ? JSON.parse(this.idLocal).id_personal : null;

  constructor(private gameService: GameServiceService, private gamesRawg: RawgService) { }
  ngOnInit(): void {
    this.gameService.getEventAllStatus().forEach(
      data => {
        for (let index = 0; index < data.length; index++) {
          console.log(data[index].id_personal)
          if (this.id == data[index].event.id_personal) {
            this.data.push(data[index].event)
          }
        }
      }
    )


    if (this.id !== null) {
      let number: number = +this.id;
      this.gameService.getAllEventsInI(number).subscribe(
        data => {
          this.eventsI = data;
        }
      )
    }

  }

  updateStatusEvent($event: any): void {
    const status = {
      status: $event.status
    }
    Swal.fire({
      title: "¿Quieres actualizar el estatus?",
      showDenyButton: true,
      confirmButtonColor: "#62D834",
      denyButtonColor: "#F13F42",
      showCancelButton: true,
      icon: "question",
      confirmButtonText: "Actualizar",
      denyButtonText: `No actualizar`
    }).then(response => {
      if (response.isConfirmed) {
        this.gameService.updateStatusEvent($event.game, status).subscribe(
          data => {
            Swal.fire("Se actualizo el estaus a en proceso", "", "success");
          },
          (error) => {
            Swal.fire("No se actualizo el estatus", "", "error");
          }
        )
      } else if (response.isDenied) {
        Swal.fire("No se aplicarion cambios", "", "error");
      }
    })

  }

  updateStateEventFinal($event: any): void {
    const status = {
      status: $event.status
    }

    Swal.fire({
      title: "¿Quieres actualizar el estatus?",
      showDenyButton: true,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      denyButtonText: `No actualizar`
    }).then(response => {
      if (response.isConfirmed) {
        this.gameService.updateStatusEvent($event.game, status).subscribe(
          data => {
            Swal.fire("Se actualizo el estaus a en finalizado", "", "success");
          },
          (error) => {
            Swal.fire("No se actualizo el estatus", "", "error");
          }
        )
      } else if (response.isDenied) {
        Swal.fire("No se aplicarion cambios", "", "error");
      }
    })
  }
}

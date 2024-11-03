import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Event, EventWithParticipantCount } from '../../../../core/models/Events';
import { Input } from '@angular/core';
import { RawgService } from '../../../../core/services/rawg.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
CommonModule
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent implements OnInit {
  flag: boolean = false;
  gameUrl: string = '';
  data: any[] = [];
  @Input() event: EventWithParticipantCount = {
    event: {
      id_event: 0,
      name: '',
      game: '',
      type_game: '',
      status: '',
      description: '',
      date: '',
      amount: 0,
      id_personal: 0
    },
    participantCount: 0
  };
  constructor(private gameService: RawgService) { }
  ngOnInit(): void {

    console.log(this.event.event)
    this.gameService.getGames().subscribe(
      data => {
        let current = '';
        let flag: boolean = false;
        this.data = data.results;
        console.log(this.data)
        for (let index = 0; index < this.data.length; index++) {
          if (this.data[index].name === this.event.event.game) {
            current = this.data[index].background_image;
            flag = true;
          }
        }

        if (!flag) {
          this.gameUrl = 'image-not-found.jpg';
        } else {
          this.gameUrl = current;
        }
      },
    )

  }
  @Output() dataEmit = new EventEmitter<{ id_personal: number; id_event: number }>();


  addEvent(): void {
    const data = this.event;
    const emitData = {
      id_personal: data.event.id_personal,
      id_event: data.event.id_event
    }
    this.dataEmit.emit(emitData)
  }
}

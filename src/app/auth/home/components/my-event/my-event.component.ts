import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Event } from '../../../../core/models/Events';
import { Input } from '@angular/core';
import { RawgService } from '../../../../core/services/rawg.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-event.component.html',
  styleUrl: './my-event.component.scss'
})
export class MyEventComponent implements OnInit {
  data: any[] = [];
  gameUrl: string = '';
  @Input() game: Event = {
    id_event: 0,
    name: '',
    game: '',
    status: '',
    type_game: '',
    description: '',
    date: '',
    amount: 0,
    id_personal: 0
  }
  @Output() emitData = new EventEmitter<{ game: string; status: string }>();

  constructor(private rawg: RawgService) { }

  ngOnInit(): void {
    this.rawg.getGames().subscribe(
      data => {
        let current = '';
        let flag = false;
        console.log(data.results)
        this.data = data.results;
        for (let index = 0; index < this.data.length; index++) {
          if (this.game.game == this.data[index].name) {
            flag = true;
            current = this.data[index].background_image;
            console.log(this.gameUrl)
          }
        }

        if (!flag) {
          this.gameUrl = 'image-not-found.jpg'
        } else {
          this.gameUrl = current;
        }

      }
    )
  }

  emitaDataStatus(): void {

    const dataEmit = {
      game: this.game.game,
      status: 'accion'
    }
    console.log(dataEmit)
    this.emitData.emit(dataEmit)
  }

  emitActionStatus(): void {
    const dataEmitStatus = {
      game: this.game.game,
      status: 'finalizado'
    }

    this.emitData.emit(dataEmitStatus);
  }
}

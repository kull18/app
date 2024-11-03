import { Component, OnInit } from '@angular/core';
import { EventPast } from '../../../../core/models/EventPast';
import { Input } from '@angular/core';
import { eventI } from '../../../../core/models/EventI';
import { RawgService } from '../../../../core/services/rawg.service';
@Component({
  selector: 'app-card-event-past',
  standalone: true,
  imports: [],
  templateUrl: './card-event-past.component.html',
  styleUrl: './card-event-past.component.scss'
})
export class CardEventPastComponent implements OnInit{
  @Input() eventPast: eventI = {
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
  data: any[] = []; 
  constructor(private RwagService: RawgService) {}
  url: string = ''
  ngOnInit(): void {
    this.RwagService.getGames().subscribe(
      data => {
        let flag = false; 
        let current = '';
        this.data = data.results;
        for(let index = 0; index < this.data.length; index++) {
          if(this.eventPast.game == this.data[index].name) {
            flag = true; 
            current = this.data[index].background_image; 
          }
        } 

        if(!flag) {
          this.url = 'image-not-found.jpg'
        }else {
          this.url = current; 
        }
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../auth/home/components/header/header.component";
import { LoginComponent } from "../../auth/home/components/login/login.component";
import { EventCardComponent } from "../../auth/home/components/event-card/event-card.component";
import { Event } from '../../core/models/Events';
import { GameServiceService } from '../../core/services/game-service.service';
import { CommonModule } from '@angular/common';
import { RawgService } from '../../core/services/rawg.service';
import Swal from 'sweetalert2';
import { EventPerson } from '../../core/models/EventPerson';
import { HeaderUserComponent } from "../../auth/home/components/header-user/header-user.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [HeaderComponent, LoginComponent, EventCardComponent, CommonModule, HeaderUserComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  data: any[] = [];
  id_personal: number = 0;
  id_event: number = 0;
  myForm: FormGroup;
  input: boolean = false;
  route: string = '';
  parse: number = 0;
  id: number = 0;
  constructor(private myServiceGame: GameServiceService, private RawgService: RawgService, private myFormBuilder: FormBuilder) {
    this.myForm = this.myFormBuilder.group({
      game: ["", []],
      type_game: ["", []]
    })
  }

  ngOnInit(): void {
    if (this.data.length !== 0) this.data = [];

    const userData: string | null = localStorage.getItem("user");
    this.parse = userData ? JSON.parse(userData).id_role : null;
    this.id = userData ? JSON.parse(userData).id_personal : null;
    this.parse === 1 ? this.route = '/admin/myEvents' : '';
    this.parse === 2 ? this.route = '/admin/myEventsUser' : '';

    this.myServiceGame.getEventAll().subscribe(
      data => {
        this.data = data;
      }
    )
  }

  getEmitData($event: any): void {
    this.id_event = $event.id_event;
    this.id_personal = this.id;
    console.log(this.id_personal)

    const eventperson: EventPerson = {
      id_personal: this.id_personal,
      id_event: this.id_event
    }
    console.log(eventperson)

    this.myServiceGame.postEventPerson(eventperson).subscribe(
      data => {
        Swal.fire("Agregar persona al evento", "se agrego", "success");
      },

      error => {
        Swal.fire("Ingresar a evento", "no se logro ingresar a evento", "error")
      }
    )
  }

  findByName(): void {
    this.myServiceGame.finByName(this.myForm.value.game).subscribe(
      data => {
        console.log(data)
        this.data = [];
        this.data = data;
      }
    )
  }

  findByTypeGame(): void {
    this.myServiceGame.finByType_game(this.myForm.value.type_game).subscribe(
      data => {
        this.data = [];
        this.data = data;
      }
    )
  }

  blurEventInput(): void {
    const valueInput = this.myForm.get('game')?.value;
    this.input = valueInput.trim() === '';
    if (this.input) {
      this.ngOnInit();
    }
  }

  blurEventInputType(): void {
    const valueInputType = this.myForm.get('type_game')?.value;
    this.input = valueInputType.trim() === '';
    if (this.input) {
      this.ngOnInit();
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../auth/home/components/header/header.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameServiceService } from '../../core/services/game-service.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { RawgService } from '../../core/services/rawg.service';
import { CommonModule } from '@angular/common';
import { HeaderUserComponent } from "../../auth/home/components/header-user/header-user.component";
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, HeaderUserComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  myForm: FormGroup;
  image = "";
  data: any[] = [];
  idLocal: string | null = localStorage.getItem("user");
  id: number = this.idLocal ? JSON.parse(this.idLocal).id_personal : null;
  constructor(private myFormBuilder: FormBuilder, private myService: GameServiceService, private rawService: RawgService) {
    this.myForm = this.myFormBuilder.group({
      id_personal: [this.id, []],
      status: ["espera", [Validators.required]],
      game: ["", [Validators.required]],
      type_game: ["", [Validators.required]],
      description: ["", [Validators.required]],
      date: ["", [Validators.required]],
      amount: [0, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.rawService.getGames().subscribe(
      response => {
        this.data = response.results;

      }
    )
  }

  onBlurImage(): string {
    const form = this.myForm.value;
    console.log(form.id_personal)
    let finImage = this.data.find((game) => game.name === form.game)
    if (finImage) {
      this.image = finImage.background_image;
    } else {
      this.image = "";
    }

    return this.image;
  }

  postEvent(): void {
    const myForm = this.myForm.value;
    console.log(myForm)
    if (!this.myForm) {
      Swal.fire("Agregar evento", "No se logro agregar evento", "error");
      return;
    }

    if (myForm.amount < 0) {
      Swal.fire("Generar evento", "No se logro generar evento", "error");
      return;
    }
    this.myService.postEventGame(this.myForm.value).subscribe(
      data => {
        Swal.fire("Add event", "se logro agregar el evento", "success")
      },

      error => {
        Swal.fire("Add", "No se logro agregar", "error")
      }
    )
  }
}

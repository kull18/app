import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameServiceService } from '../../../../core/services/game-service.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  options: string[] = ["organizador", "usuario"];
  optionSelected: string;
  constructor(private myFormBuilder: FormBuilder, private GameService: GameServiceService) {
    this.optionSelected = this.options[0];
    this.myForm = this.myFormBuilder.group({
      id_role: [1, []],
      name: ["", []],
      email: ["", []],
      password: ["", []]
    })
  }

  ngOnInit(): void {
    this.myForm.get("id_role")?.valueChanges.subscribe(
      item => {
        if (item === "organizador") {
          this.myForm.patchValue({ "id_role": 1 })
          return;
        };

        if (item === "usuario") {
          this.myForm.patchValue({ "id_role": 2 });
          console.log("item" + item)
          return;
        }
      }
    )
  }

  seleccionarOpcion(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.optionSelected = selectElement.value;
    console.log('Opción seleccionada:', this.optionSelected);
  }
  register(): void {
    console.log(this.myForm.value)
    this.GameService.register(this.myForm.value).subscribe(
      register => {
        Swal.fire("Register", "Se registro al sistema", "success");
      },

      (error) => {
        Swal.fire("Registrarse", "no se logro resgistrar", "error");
      }
    )
  }

}

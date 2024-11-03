import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameServiceService } from '../../../../core/services/game-service.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  myFormLogin: FormGroup;

  constructor(private myFormBuilder: FormBuilder, private gameService: GameServiceService, private route: Router) {
    this.myFormLogin = this.myFormBuilder.group({
      name: ["", []],
      email: ["", []],
      password: ["", []]
    })
  }

  login(): void {
    this.gameService.loginUser(this.myFormLogin.value).subscribe(
      data => {
        const user = {
          id_personal: data.personal.personal_id,
          id_role: data.personal.id_role
        }
        console.log(user)
        localStorage.setItem("user", JSON.stringify(user));
        this.gameService.login();
        this.route.navigate(["/"])
      },
      error => {
        Swal.fire("Logeo", "Error de logeo", "error")
      }
    )
  }
}

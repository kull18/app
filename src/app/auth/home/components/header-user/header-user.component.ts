import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameServiceService } from '../../../../core/services/game-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss'
})
export class HeaderUserComponent implements OnInit {
  constructor(private GameService: GameServiceService) { }
  isLoged: boolean = true;
  userData: string | null = localStorage.getItem("user");
  id_role = this.userData ? JSON.parse(this.userData).id_role : null;

  ngOnInit(): void {
    this.isLoged = this.GameService.isAuthenticade();
  }

  LogOut(): void {
    this.GameService.logOut();
    this.ngOnInit();
    localStorage.clear(); 
  }
}

import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeaderUserComponent } from "../header-user/header-user.component";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [HeaderComponent, HeaderUserComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

}

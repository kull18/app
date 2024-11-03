import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RawgService } from './core/services/rawg.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'GamesOrganizer';
  data: any[] = [];
  constructor(private gamesService: RawgService) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(
      data => {
        this.data = data;
        console.log(data)
      },

      error => {
        console.log(error)
      }
    )
  }

}

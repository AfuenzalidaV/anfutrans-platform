import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from './core/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get('catalogos/regiones').subscribe(console.log);
  }
}

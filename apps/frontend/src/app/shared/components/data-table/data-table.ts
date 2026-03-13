import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {

  @Input() data: any[] = [];
  @Input() columns: string[] = [];

}

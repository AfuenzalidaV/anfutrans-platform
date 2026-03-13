import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DataTable } from './components/data-table/data-table';

@NgModule({
  declarations: [DataTable],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [DataTable]
})
export class SharedModule { }

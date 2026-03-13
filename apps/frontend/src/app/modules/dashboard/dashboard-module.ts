import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [Dashboard],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ],
})
export class DashboardModule {}

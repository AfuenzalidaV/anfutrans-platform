import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SociosService } from '../socios.service';
import { Socio } from '../../../shared/models';

@Component({
  selector: 'app-socios-list',
  standalone: false,
  templateUrl: './socios-list.html',
  styleUrl: './socios-list.scss',
})
export class SociosList implements OnInit {

  displayedColumns: string[] = ['rut', 'nombre', 'apellido', 'email', 'telefono'];
  dataSource: MatTableDataSource<Socio>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sociosService: SociosService) {
    this.dataSource = new MatTableDataSource<Socio>([]);
  }

  ngOnInit() {
    this.loadSocios();
  }

  loadSocios() {
    this.sociosService.getSocios().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error al cargar socios:', error);
        // Por ahora datos de demo
        this.dataSource.data = [
          { id: '1', rut: '12345678-9', nombre: 'Juan', apellido: 'Pérez', email: 'juan@mail.com', telefono: '+56912345678', comunaId: 1 },
          { id: '2', rut: '98765432-1', nombre: 'María', apellido: 'González', email: 'maria@mail.com', telefono: '+56987654321', comunaId: 2 },
          { id: '3', rut: '11223344-5', nombre: 'Pedro', apellido: 'López', email: 'pedro@mail.com', telefono: '+56911223344', comunaId: 1 }
        ];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Servicio global para gestionar estados de carga
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingCountSubject = new BehaviorSubject<number>(0);

  /**
   * Observable del estado de carga global
   */
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * Observable del contador de cargas activas
   */
  loadingCount$: Observable<number> = this.loadingCountSubject.asObservable();

  /**
   * Activa el indicador de carga
   */
  show(): void {
    const currentCount = this.loadingCountSubject.value;
    this.loadingCountSubject.next(currentCount + 1);
    this.loadingSubject.next(true);
  }

  /**
   * Desactiva el indicador de carga
   */
  hide(): void {
    const currentCount = this.loadingCountSubject.value;
    const newCount = Math.max(0, currentCount - 1);
    this.loadingCountSubject.next(newCount);

    if (newCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  /**
   * Fuerza el ocultado del indicador
   */
  forceHide(): void {
    this.loadingCountSubject.next(0);
    this.loadingSubject.next(false);
  }

  /**
   * Obtiene el estado actual de carga
   */
  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}

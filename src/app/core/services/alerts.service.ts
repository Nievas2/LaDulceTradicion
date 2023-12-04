import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private mensajeVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  mensajeVisible$: Observable<boolean> = this.mensajeVisibleSubject.asObservable();

  private mensajeContenidoSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  mensajeContenido$: Observable<string> = this.mensajeContenidoSubject.asObservable();

  mostrarMensaje(mensaje: string) {
    this.mensajeContenidoSubject.next(mensaje);
    this.mensajeVisibleSubject.next(true);
  }

  ocultarMensaje() {
    this.mensajeVisibleSubject.next(false);
  }
}

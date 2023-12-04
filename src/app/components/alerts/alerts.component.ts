import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/core/services/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  template: '<div *ngIf="mensajeVisible">{{ mensajeContenido }}</div>',
})
export class AlertsComponent implements OnInit{
  mensajeVisible: boolean = false;
  mensajeContenido: string = '';
  private subscription!: Subscription;

  constructor(private alertsService: AlertsService) {}

  ngOnInit() {
    this.subscription = this.alertsService.mensajeVisible$.subscribe((visible) => {
      this.mensajeVisible = visible;
    });

    this.subscription.add(
      this.alertsService.mensajeContenido$.subscribe((contenido) => {
        this.mensajeContenido = contenido;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

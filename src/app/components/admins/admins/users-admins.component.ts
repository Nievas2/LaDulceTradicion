import { Component } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-admins',
  templateUrl: './users-admins.component.html',
  styleUrls: ['./users-admins.component.css'],
})
export class UsersAdminsComponent {
  users: User[] = [];
  id: number = 0;
  constructor(
    private userService: UserService,
    private alertsService: AlertsService
  ) {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = <any>data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  patchAdmin() {
    this.userService.patchAdmins(this.id).subscribe(
      (data) => {
        this.alertsService.mostrarMensaje('Usuario actualizado con exito');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
        window.location.reload();
      },
      (error) => {
        this.alertsService.mostrarMensaje('hubo un error');

        setTimeout(() => {
          this.alertsService.ocultarMensaje();
        }, 4000);
      }
    );
  }
  selectId(id: number) {
    this.id = id;
  }
}

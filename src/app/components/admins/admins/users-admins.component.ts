import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-admins',
  templateUrl: './users-admins.component.html',
  styleUrls: ['./users-admins.component.css'],
})
export class UsersAdminsComponent {
  users: User[] = [];
  id: number = 0;
  admin!: boolean;
  constructor(
    private userService: UserService,
    private alertsService: AlertsService,
    private loginSvc: LoginService,
    private router: Router
  ) {
    this.getUsers()
  }
  ngOnInit(): void {
    this.loginSvc.isAdmin.subscribe((isAdmin) => {
      this.admin = isAdmin;
      if (this.admin === false) {
        /* this.router.navigateByUrl(''); */
      }
    });
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

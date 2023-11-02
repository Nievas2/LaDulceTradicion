import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { LoginService } from 'src/app/core/services/login.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from '../../core/interfaces/Category';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  categories!: any[];
  email: string = '';
  password: string = '';
  ListarUser: any;
  confirmPassword: string = '';
  cerrarSesion: boolean = false;
  iniciarSesion: boolean = true;
  userData: any = {};
  token: string | null = null;
  admin: boolean = false;
  register: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.getCategories();
  }
  ngOnInit(): void {
    this.loginService.token.subscribe((token) => {
      this.token = token;
    });
    this.loginService.isAdmin.subscribe((isAdmin) => {
      this.admin = isAdmin;
    });
    this.loginService.isRegistered.subscribe((isRegistered) => {
      this.register = isRegistered;
    });
  }

  logOut() {
    localStorage.removeItem('token');
    location.reload();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = <any>data;
    },
    (error)=>{
      console.log(error)
    }
    );
  }
}

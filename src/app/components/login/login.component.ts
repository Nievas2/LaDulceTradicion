import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/interfaces/login';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginError = '';

  form: FormGroup;

  loginData: LoginData = {
    email: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private loginSvc: LoginService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.register();
  }

  ngOnInit(): void {}
  register() {
    this.form.setValue({
      email: '',
      password: '',
    });
  }

  login () {
    this.loginData = {
      email: this.form.value.email,
      password: this.form.value.password,
    }
    try {
      this.loginSvc.login(this.loginData).subscribe(
        (data)=>{
          this.router.navigateByUrl('');
          this.form.reset();
          /* this.toastr.success("Correcto inicio de sesion") */
      },
      
      (error)=>{
        /* this.toastr.error("Contraseña o email incorrectos") */
      }
      );

    } catch {
      /* this.toastr.error("Contraseña o email incorrectos") */

    }
    
  }
}

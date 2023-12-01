import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.component.html',
  styleUrls: ['./nueva-contrasena.component.css'],
})
export class NuevaContrasenaComponent {
  form: FormGroup;
  email: string;
  code: string;
  newPassword : string = ""
  constructor(private formBuilder: FormBuilder, private loginService : LoginService,
    private aRouter: ActivatedRoute,) {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      repeatpassword: ['', Validators.required],
    });
    this.code = String(aRouter.snapshot.paramMap.get('code'));
    
    this.email = String(aRouter.snapshot.paramMap.get('email'));
  }

  newPasswordForm(){
    if(this.form.value.password == this.form.value.repeatpassword){
      /* llamada al back para cambiarla */

      this.newPassword = this.form.value.password
      this.loginService.createPassword(this.email, this.code, this.newPassword).subscribe(
        (data)=>{

          console.log("contraseña cambiada")
        },(error)=>{
          console.log(error)
        }
        )
    }else{
      console.log("son diferentes")
      /* mensaje de que tiene que ser iguales las contraseñas */
    }
  }
}

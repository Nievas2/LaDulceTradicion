import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css'],
})
export class ContactanosComponent {
  form: FormGroup;
  consulta: string ="";
  isRegistered!: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    this.form = this.formBuilder.group({
      consulta: ['', Validators.required],
    });

    this.contact();
  }

  ngOnInit(): void {
    this.loginService.isRegistered.subscribe((data)=>{
      this.isRegistered = data
    })
  }
  contact() {
    this.form.setValue({
      consulta: '',
    });
  }
  sendContact(){
    this.consulta = this.form.value.consulta
    console.log(this.consulta)
  }
}

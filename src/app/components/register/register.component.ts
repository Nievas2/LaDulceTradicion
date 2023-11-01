import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  registro:boolean=false;
  user: User = {
    id: 0,
    firstName:"",
    lastName:'',
    email:'',
    phone: '',
    password:'',
    active: true,
    admin:false,
   

  }
  constructor(private userService: UserService,private fb: FormBuilder,private router: Router,) { 
      this.form = this.fb.group({
        firstName:  ['', Validators.required],
        lastName:  ['', Validators.required],
        email:  ['', Validators.required],
        phone:  [''],
        password:  ['', Validators.required],

      })
      this.register()
  }

  createUser(){
    this.user = {
      id:0,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phone: this.form.value.phone,
      password: this.form.value.password,
      active: true,
      admin:false,
    }

    this.userService.postUser(this.user)
    .subscribe(
      (data) => {this.registro= true;},
      (error) => {
        console.log(error);
      }
    );
  }

  register(){
    this.form.setValue({
    firstName:"",
    lastName:"",
    email:"",
    phone: "",
    password:"",
    })
  }
}

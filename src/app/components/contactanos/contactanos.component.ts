import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css'],
})
export class ContactanosComponent {
  form: FormGroup;
  consulta: string ="";
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      consulta: ['', Validators.required],
    });

    this.contact();
  }

  ngOnInit(): void {}
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

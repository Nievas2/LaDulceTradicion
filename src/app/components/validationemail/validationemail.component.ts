import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-validationemail',
  templateUrl: './validationemail.component.html',
  styleUrls: ['./validationemail.component.css']
})
export class ValidationemailComponent {


  email: string = '';
  code: string = '';
  validateOK: boolean = false;
  constructor(private userService: UserService, private route: ActivatedRoute) {
    if (
      this.route.snapshot.paramMap.get('email') != null &&
      this.route.snapshot.paramMap.get('code') != null
    ) {
      this.email = this.route.snapshot.paramMap.get('email')!;
      this.code = this.route.snapshot.paramMap.get('code')!;
    }
    this.validateCode();
  }
  validateCode() {
    const validate = this.userService.validateCode(this.email, this.code).subscribe(
      (data)=>{
        
      },
      (error)=>{
        this.validateOK=false;
        
      }
);
    
    if(validate){
      this.validateOK = true;
    }
  }
}

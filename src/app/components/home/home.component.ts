import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { UserServiceService } from 'src/app/SERVICES/user-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faArrowAltCircleUp = faArrowAltCircleUp;

}

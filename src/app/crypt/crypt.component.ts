import { Component, OnInit } from '@angular/core';
import { Request } from '../providers/request';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-crypt',
  templateUrl: './crypt.component.html',
  styleUrls: ['./crypt.component.css']
})
export class CryptComponent implements OnInit {
  request: Request;

  constructor(authService: AuthService) {
    this.request = new Request();
    this.request.userId = authService.userId;
    // console.log("CryptComponent constructor, creating new request: " + JSON.stringify(this.request));
   }

  ngOnInit() {
  }

}

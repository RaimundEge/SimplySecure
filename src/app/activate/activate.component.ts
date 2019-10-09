import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { SecureURL } from '../app.config';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  code: string;
  message: string;
  actForm: FormGroup;

  constructor(private route: ActivatedRoute, public http: HttpClient, public router: Router, public authService: AuthService) {
    //  console.log('ActivateComponent constructor');
    this.actForm = new FormGroup({
      code: new FormControl()
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(pMap => {
      this.code = pMap.get("code");
      console.log('ngOnInit: got this code: ' + this.code);
      if (this.code !== null) {
        this.doActivate(this.code);
      }
    });
  }

  doActivate(code: string) {
    // console.log('doActivate: ' + code);
    if (code === undefined || code === null) {
      return;
    }
    code = code.trim();
    if (code !== '') {
      // send activation request to REST server
      this.http.get(SecureURL + '/rest/login?code=' + code).subscribe(
        (data: any) => {
          console.log('activate returned:' + JSON.stringify(data));
          if (data.status === 'User OK') {
            this.authService.login(data);
            this.message = 'Welcome to Simply Secure !'
            setTimeout(() => { this.router.navigate(['home']); }, 5000);
          } else {
            this.message = data.status;
          }
        }
      );
    }
  }
}

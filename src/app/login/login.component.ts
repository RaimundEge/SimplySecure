import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SecureURL } from '../app.config';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'login-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  message: string = '';
  mode: string = "no";

  constructor(public dialogRef: MatDialogRef<LoginComponent>, fb: FormBuilder, public http: HttpClient, public authService: AuthService, public router: Router) {
    // For our form, we’ll just have two fields and we’ll require both of them to be filled out before the form can be submitted
    // this.loginForm = fb.group({
    //   'userName': [null, Validators.required],
    //   'password': [null, Validators.required],
    // })
  }

  submitForm() {
    // login with users email and password
    // console.log('submitForm');
    // console.log(this.loginForm);
    // show progress spinner
    this.mode = "show";

    // prepare call to REST backend
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) };
    var body = { "userName": this.loginForm.controls['userName'].value, "password": this.loginForm.controls['password'].value };

    this.http.post(SecureURL + '/login', body, httpOptions).subscribe(
      (data: any) => {
        // turn off progress spinner
        this.mode = "no";
        console.log('member lookup returned:' + JSON.stringify(data));
        if (data.status === 'User OK') {
          this.authService.login(data);
          this.dialogRef.close();
          this.router.navigate(['home']);
        } else {
          this.message = data.status;
        }
      },
      (err) => {
        console.log(err);
        // turn off progress spinner
        this.mode = "no";
        this.message = "Service unavailable, try again later";
      }
    )
  }

}
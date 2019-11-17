import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SecureURL } from '../app.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  regForm: FormGroup;
  message: string;
  userError: string = '* required';
  mode: string = "no";

  constructor(public http: HttpClient, public router: Router) {
    // We’ll check if the user is logged in once this component is loaded. We’ll do this by checking if a jwt key value pair exists in local storage.
    // For our form, we’ll just have two fields and we’ll require both of them to be filled out before the form can be submitted
    this.regForm = new FormGroup({
      'userName': new FormControl(),
      'pwd1': new FormControl(),
      'pwd2': new FormControl(),
      'email': new FormControl()
    })
  }

  checkId() {
    this.userError = '';
    let field = this.regForm.controls['userName'];
    let value = field.value;
    if (value.length < 6) {
      field.setErrors({ 'bad': true });
      this.userError = 'User name is too short';
      return;
    }
    if (value.indexOf(' ') >= 0) {
      field.setErrors({ 'bad': true });
      this.userError = 'User name contains spaces';
      return;
    }
    let url = SecureURL + '/member/' + value;
    console.log(url);
    // send activation request to REST server
    this.http.get(url, {responseType: 'json'}).subscribe(
      (data: any) => {
        console.log('checking for member returned: ' + data.status);
        if (data.status === 'User OK') {
          field.setErrors({ 'bad': true });
          this.userError = 'User name already in use';
        }
      }
    )
  }

  updateConfirm() {
    // console.log('updateConfirm: ' + this.regForm.controls.pwd1.value);
    if (this.regForm.controls.pwd2.touched) {
      if (this.regForm.controls.pwd2.value !== this.regForm.controls.pwd1.value) {
        this.regForm.controls.pwd2.setErrors({ 'pattern': 'passwords do not match' });
      }
    }
  }

  updateEmail() {
    // console.log('updateEmail: ' + this.regForm.controls.email.value);
    if (this.regForm.controls.email.value !== '') {
      if (!this.regForm.controls.email.value.match(/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)) {
        // console.log('its not a match');
        this.regForm.controls.email.setErrors({ 'format': 'email invalid' });
      }
    }
  }

  submitForm() {
    let controls = this.regForm.controls;
    var mailReturn: string = document.URL.substring(0,document.URL.lastIndexOf("/"));
    console.log('mailReturn: ' + mailReturn)    
    var prefix = mailReturn.substring(0, mailReturn.indexOf("/"));
    console.log('submitForm: ' + prefix);
    // console.log(controls);
    // console.log('userName valid: ' + controls.userName.valid);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })};
    let body = { "userName": controls.userName.value, "password": controls.pwd1.value, "email": controls.email.value, "addr": mailReturn };
    console.log(body);
    this.mode = "show";
    this.http.post(SecureURL + '/register', body, httpOptions).subscribe(
      (data: any) => {
        // console.log('register returned:');
        // console.log(res);
        this.mode = "no";
        this.message = data.message;
        // on success wait 10 secs then navigate to activate page
        if (this.message.match(/Success/)) {
          setTimeout(() => { this.router.navigate(['activate']); }, 10000);
        }
      }
    )
  }
}

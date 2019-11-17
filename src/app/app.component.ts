import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './providers/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestURL } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'SimplySecure';
  user: string = 'Members';
  login = true;
  logout = false;
  register = true;
  server = "secure.ege.com";
  author = "Ege Consulting Inc.";

  getWidth() {
    var top = document.getElementById('top-banner');
    // console.log("getWidth: " + top.clientWidth);
    return top.clientWidth + "px";
  }

  constructor(public dialog: MatDialog, public authService: AuthService, public router: Router, public http: HttpClient) {
    console.log('AppComponent constructor')
    // send activation request to REST server
    this.http.get(RestURL).subscribe(
      (data: any) => {
        console.log('checking for member returned: ' + JSON.stringify(data));
      }
    )
  }

  openDialog() {
    let dialogRef = this.dialog.open(LoginComponent);
  }

  doLogout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
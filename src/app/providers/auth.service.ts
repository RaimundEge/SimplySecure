import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SecureURL } from '../app.config';

interface UserType {
  userId: number;
  userName: String;
  email: String;
};
interface KeyType {
  id: number;
  algorithm: string;
  length: number;
  keySize: number;
  mode: string;
  files: File[];
}

@Injectable()
export class AuthService {

  isLoggedIn: Boolean = false;
  userId: number = -1;
  displayName: String = "Member";
  email: String = "";
  files: File[] = [];
  keys: KeyType[] = [];
  selectedKey: any = null;

  constructor(public http: HttpClient) {
    // console.log("AuthService constructor");
    let stuff = localStorage.getItem('user');
    // console.log('from local storage: ' + stuff);
    if (stuff !== null) {
      let data = JSON.parse(stuff);
      if (data.status === 'User OK') {
        if (data.userName !== undefined) {
          this.displayName = data.userName;
          this.userId = data.userId;
          this.isLoggedIn = true;
          this.email = data.email;
          this.refreshFiles();
          this.refreshKeys();
        } else {
          console.log("AuthService, data.userName: " + data.userName);
        }
      } else {
        console.log("AuthService, data.status: " + data.status);
      }
    } 
  }

  refreshFiles() {
    // console.log("AuthService refreshFiles, member: " + this.userId);
    this.http.get(SecureURL + '/list/' + this.userId, { responseType: 'json' }).subscribe(
      (data: any) => { 
        // console.log("AuthService refreshFiles, files length before: " + this.files.length);
        this.files = data;
        // console.log("AuthService refreshFiles, files length after: " + this.files.length);
        // console.log(this.files);
      });
  }

  refreshKeys() {
    // console.log("AuthService refreshKeys, member: " + this.userId);
    this.http.get(SecureURL + '/keys/' + this.userId, { responseType: 'json' }).subscribe(
      (data: any) => { 
        // console.log("AuthService refreshKeys: " + JSON.stringify(data));
        this.keys.length = 0;
        data.forEach((element: KeyType) => this.keys.push(element));
        // console.log("AuthService refreshKeys, keys length after: " + this.keys.length);
        // console.log(this.keys);
      });
  }

  login(user: UserType) {
    localStorage.setItem('user', JSON.stringify(user));
    this.displayName = user.userName;
    this.isLoggedIn = true; 
    this.email = user.email;
    this.userId = user.userId;
    this.refreshFiles();
    this.refreshKeys();
  }
 
  // register(user, email, password) {

  // }

  logout() {
    localStorage.removeItem('user');
    this.displayName = "Member";
    this.isLoggedIn = false;
    this.email = "";
    this.files.length = 0;
    this.keys.length = 0;
  }
}
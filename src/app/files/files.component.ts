import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SecureURL } from '../app.config';
import { AuthService } from '../providers/auth.service';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  constructor(public http: HttpClient, public authService: AuthService) { }

  ngOnInit() {
  }

  getDownloadLink(file) {
    //  console.log("getDownloadLink: " + JSON.stringify(file));
    var fileName = encodeURIComponent(file.name);
    return SecureURL + "/rest/download/" + file.dir + "/" + this.authService.userId + "/" + fileName;
  }

  deleteFile(file) {
    console.log("deleteFile: " + JSON.stringify(file));
    var fileName = encodeURIComponent(file.name);
    this.http.get(SecureURL + "/rest/delete/" + "/" + file.dir + "/" + this.authService.userId + "/" + fileName).subscribe(
      data => { 
        console.log("delete returned: " + JSON.stringify(data));
        this.authService.refreshFiles();
      }
    );
  }

}

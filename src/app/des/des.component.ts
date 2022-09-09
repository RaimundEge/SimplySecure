import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from '../providers/request';
import { AuthService } from '../providers/auth.service';
import { SecureURL } from '../app.config';
import { DownloadComponent } from '../download/download.component';

@Component({
  selector: 'app-des',
  templateUrl: './des.component.html',
  styleUrls: ['./des.component.css']
})
export class DesComponent implements OnInit {
  // toolForm: FormGroup;
  request: Request;
  spinner = "no";
  message: string = '';
  keySize = "64";

  constructor(public http: HttpClient, public authService: AuthService, public dialog: MatDialog) {
    this.request = new Request();
  }

  ngOnInit() {
    this.request.userId = this.authService.userId;
    this.request.algorithm = "DES";
    this.request.op = "encrypt";
    this.request.ivSize = 64; // DES block size
    this.request.mode = "ECB";
    this.request.keyStyle = "password";
    // console.log("DesComponent ngOnInit, request: " + JSON.stringify(this.request));
  }

  onSubmit() {

    this.request.keySize = +this.keySize;
    if (this.request.keySize == 192) {
      this.request.algorithm = "DESede";
    } else {
      this.request.algorithm = "DES";
    }
    if (this.gotKey()) {
      this.request.keyId = this.authService.selectedKey;
    }
    console.log("onSubmit: " + JSON.stringify(this.request));

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) };
    this.spinner = "show";
    this.http.post(SecureURL + '/process', this.request, httpOptions).subscribe({
      next: (data: any) => {
        console.log('process returned:');
        console.log(data);
        this.spinner = "no";
        this.message = data.status + " file is also available under the File Management tab";
        this.authService.refreshFiles();
        this.authService.refreshKeys();
        this.openDialog(data);
      },
      error: (msg) => {
        console.log(msg)
      }
    });
  }

  checkFile() {
    // console.log("checkFile: " + JSON.stringify(this.request))
    // console.log("file name: " + this.request.fileName + ", uploaded: " + this.request.uploadComplete);
    if (this.request.uploadComplete == false)
      return false;
    else
      return this.request.fileName !== undefined;
  }

  openDialog(map: Object) {
    let dialogRef = this.dialog.open(DownloadComponent, { data: map });
    dialogRef.afterClosed().subscribe(result => {
      //  console.log('dialog closed: ' + result);
    });
  }

  gotKey() {
    if (this.authService.selectedKey !== null) {
      for (var key of this.authService.keys) {
        if (key.id == this.authService.selectedKey)
          if (key.algorithm == "DES" || key.algorithm == "DESede")
            return true;
      }
    }
    return false;
  }
  getKeyData() {
    for (var key of this.authService.keys) {
      if (key.id == this.authService.selectedKey)
        return key.algorithm + "/" + key.keySize + "/" + key.mode;
    }
    return null;
  }

  resetKey() {
    this.authService.selectedKey = null;
  }

}

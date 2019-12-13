import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Request } from '../providers/request';
import { AuthService } from '../providers/auth.service';
import { SecureURL } from '../app.config';
import { DownloadComponent } from '../download/download.component';

@Component({
  selector: 'app-rc4',
  templateUrl: './rc4.component.html',
  styleUrls: ['./rc4.component.css']
})
export class Rc4Component implements OnInit {

  request: Request;
  spinner = "no";
  message: string;
  file: any;
  filemsg: string;

  constructor(public http: HttpClient, public authService: AuthService, public dialog: MatDialog) {
    this.request = new Request();
  }

  ngOnInit() {
    this.request.algorithm = "RC4";
    this.request.userId = this.authService.userId;
    this.request.op = "encrypt";
    this.request.keySizeString = "64";
    this.request.ivSize = 128; // DES block size
    this.request.mode = "ECB";
    this.request.keyStyle = "password"; 
    // console.log("AesComponent ngOnInit, request: " + JSON.stringify(this.request));
  }

  onSubmit() {    
    this.request.keySize = +this.request.keySizeString;
    this.request.ivSize = 128; // AES block size
    if (this.gotKey()) {
      this.request.keyId = this.authService.selectedKey;
    }
    console.log("onSubmit: " + JSON.stringify(this.request));

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) };
    this.spinner = "show";
    this.http.post(SecureURL + '/process', this.request, httpOptions).subscribe(
      (data: any) => {
        console.log('process returned:');
        console.log(data);
        this.spinner = "no";
        this.message = data.status;
        this.authService.refreshFiles();
        this.authService.refreshKeys();
        this.openDialog(data);
      }
    );
  }

  checkFile() {
   // console.log("checkFile: " + JSON.stringify(this.request))
   // console.log("file name: " + this.request.fileName + ", uploaded: " + this.request.uploadComplete);
    if (this.request.uploadComplete == false)
      return false;
    else
      return this.request.fileName !== undefined;
  }

  openDialog(map) {
    let dialogRef = this.dialog.open(DownloadComponent, { data: map });
    dialogRef.afterClosed().subscribe(result => {
      //  console.log('dialog closed: ' + result);
    });
  }

  gotKey() {
    if (this.authService.selectedKey !== null) {
      for (var key of this.authService.keys) {
        if (key.id == this.authService.selectedKey)
          if (key.algorithm == "AES")
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
  }

  resetKey() {
    this.authService.selectedKey = null;
  }

  setFile(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.request.fileName = this.file.name;
      this.request.uploadComplete = false;
      console.log('set upload file: ' + this.file.name + ' - ' + this.file.size + ' bytes');

      let formData: FormData = new FormData();
      formData.append('userId', '' + this.request.userId);
      formData.append('file', this.file, this.file.name);
      const httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json' }) };
      // show progress
      this.filemsg = "uploading ...";
      this.http.post(SecureURL + '/upload', formData, httpOptions)
        .subscribe((data: any) => {
          // turn off progress spinner
          this.filemsg = data.status;
          console.log('filemsg: ', this.filemsg)
          this.request.uploadComplete = true;
          this.authService.refreshFiles();
        },
          error => {
            this.filemsg = "upload failed: try again later";
            this.request.uploadComplete = false;
            console.log(error);
          })
    }
  }

}



import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../providers/auth.service';
import { Request } from '../providers/request';
import { SecureURL } from '../app.config';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() request: Request;
  file: any;
  message: string;

  constructor(public http: HttpClient, public authService: AuthService) { }

  ngOnInit() {
    // console.log("Select ngOnInit for request: " + this.request.algorithm);
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
      this.message = "uploading ...";
      this.http.post(SecureURL + '/rest/upload', formData, httpOptions)
        .subscribe((data: any) => {
          // turn off progress spinner
          this.message = data.status;
          this.request.uploadComplete = true;
          this.authService.refreshFiles();
        },
          error => {
            this.message = "upload failed: try again later";
            this.request.uploadComplete = false;
            console.log(error);
          })
    }
  }
}

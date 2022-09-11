import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DownloadComponent } from '../download/download.component';
import { SecureURL } from '../app.config';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {
  toolForm: FormGroup;
  user: string = 'Members';
  file: File | any = null;
  mode: string = "no"
  message = "Make sure to record your password !";

  constructor(private recaptchaV3Service: ReCaptchaV3Service, public http: HttpClient, public dialog: MatDialog) {
    // console.log('ToolsComponent constructor');
    this.toolForm = new FormGroup({
      'fileField': new FormControl(''),
      'pwd1': new FormControl(),
      'pwd2': new FormControl()
    })
  }

  public send(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token: string) => {
        console.log(`Token [${token}] generated`);
      });
  }

  setFile(event: any) {
    // console.log("doUpload");
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      // console.log('set upload file: ' + this.file.name + ' - ' + this.file.size + ' bytes');
    }
  }

  updateConfirm() {
    // console.log('updateConfirm: ' + this.toolForm.controls.pwd1.value);
    if (this.toolForm.controls['pwd2'].touched) {
      if (this.toolForm.controls['pwd2'].value !== this.toolForm.controls['pwd1'].value) {
        this.toolForm.controls['pwd2'].setErrors({ 'pattern': 'passwords do not match' });
      }
    }
  }

  basicCrypt(op: string) {
    console.log('basicCrypt: ' + op);
    console.log('processing file: ' + this.file.name + ' - ' + this.file.size + ' bytes');
    const formData = new FormData();
    formData.append('op', op);
    formData.append('pwd', this.toolForm.controls['pwd1'].value);
    formData.append('file', this.file, this.file.name);
    const httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json' }) };
    this.recaptchaV3Service.execute('basicCrypt')
      .subscribe((token: string) => {
        console.log(`Token [${token}] generated`);
        formData.append('token', token);
        // show progress spinner
        this.http.post(SecureURL + '/crypt', formData, httpOptions)
          .subscribe({
            next: (data: any) => {
              // turn off progress spinner
              this.mode = "no";
              console.log('response received: ');
              console.log(data);
              this.openDialog(data);
            },
            error: (msg) => {
              this.mode = "no";
              this.message = op + "ion failed: try again later"
              console.log(msg);
            }
          })
      });
  }

  openDialog(map: Object) {
    let dialogRef = this.dialog.open(DownloadComponent, { data: map });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('dialog closed: ' + result);
      this.toolForm.reset();
    });
  }

}
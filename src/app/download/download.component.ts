import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecureURL } from '../app.config';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DownloadComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    var fileName = encodeURIComponent(data.name);
    this.data['URL'] = SecureURL + '/download/' + this.data.member + '/' + fileName;
    console.log('DownloadComponent data:', this.data);
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filepopup',
  templateUrl: './filepopup.component.html',
  styleUrls: ['./filepopup.component.css']
})
export class FilepopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FilepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log('FilepopupComponent data:', this.data);
  }

  ngOnInit() {
  }

  getFileTS(file: any) {
    return Object.keys(file)[0];
  }
  getFileName(file: any) {
    return Object.values(file)[0];
  }
}

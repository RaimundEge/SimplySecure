import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../providers/auth.service';
import { FilepopupComponent } from '../filepopup/filepopup.component';

export interface Key {
  id: number;
  algorithm: string;
  keySize: number;
  mode: string;
  files: any;
}

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {

  constructor(public authService: AuthService, public dialog: MatDialog) { 
    // console.log("KeysComponent constructor");
  }

  ngOnInit() {
    // console.log("KeysComponent ngOnInit, keys: " + JSON.stringify(this.authService.keys));
  }

  showInfo(key) {
    // console.log(key);
    let dialogRef = this.dialog.open(FilepopupComponent, { data: key.files });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('dialog closed: ' + result);
    });
  }
  
  getTS(key) {
    // console.log(Object.keys(key.files[0])[0]);
    return Object.keys(key.files[0])[0];
  }

  resetKey() {
    this.authService.selectedKey = null;
  }

  getSelectedKey() {
    if (this.authService.selectedKey !== null) 
      return "Selected key: " + this.authService.userId + "-" + this.authService.selectedKey;
  }
}

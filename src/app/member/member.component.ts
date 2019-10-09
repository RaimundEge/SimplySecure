import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  toolForm: FormGroup;

  constructor() {
    this.toolForm = new FormGroup({
      fileField: new FormControl(''),
      pwd1: new FormControl(),
      pwd2: new FormControl()
    });
  }

  ngOnInit() {
  }

}

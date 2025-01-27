import { Component, OnInit } from '@angular/core';
import { UserInputComponent } from './user-input/user-input.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  searchedUserName!: string;
  constructor() {}
  ngOnInit() {}
  getUser(userName: string) {
    this.searchedUserName = userName;
  }
}

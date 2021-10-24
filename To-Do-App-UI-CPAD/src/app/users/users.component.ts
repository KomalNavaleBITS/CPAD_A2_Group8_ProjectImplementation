import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  myModel: any;


  userList: any;

  username: any;

  isEdit = false;

  editUserData:any;

  // @ViewChild('nameInput') nameInput: ElementRef;

  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(){
    this.userService.fetchUsers().subscribe(res => {
    
      this.userList = res;
    }, err => {
      console.log(err);

    });
  }

  addUser(){
 
    this.userService.addUser(this.myModel).subscribe(res => {
      this.fetchUsers();
      this.myModel = '';
    }, err => {
      console.log(err);

    });
  }

  editUserPopulate(editUser:any){
    this.myModel = editUser.name;
    this.editUserData = editUser;

    this.isEdit = true;
  }

  editUser(){
    this.userService.updateUser(this.myModel, this.editUserData._id).subscribe(res => {
      console.log(res);
      this.fetchUsers();

      this.myModel = '';

      this.isEdit = false;
    }, err => {
      console.log(err);

    });
  }

  deleteUser(id: string){
    this.userService.deleteUser(id).subscribe(res => {
    }, err => {
      console.log(err);
    });
    this.fetchUsers();
  }

}

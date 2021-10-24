import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  myModel: any;


  userList: any;

  username: any;

  isEdit = false;

  editUserData:any;

  constructor(
    private taskService: TasksService,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(){
    this.taskService.fetchTasks().subscribe(res => {
      this.userList = res;
    }, err => {
      console.log(err);
    });
  }

  addUser(){
 
    this.taskService.addTask(this.myModel).subscribe(res => {
      this.fetchUsers();
      this.myModel = '';
    }, err => {
      console.log(err);
    });
  }

  editUserPopulate(editUser:any){
    this.myModel = editUser.displayname;
    this.editUserData = editUser;

    this.isEdit = true;
  }

  editUser(){
    this.taskService.updateTask(this.myModel, this.editUserData._id).subscribe(res => {
      console.log(res);
      this.fetchUsers();
      this.myModel = '';
      this.isEdit = false;
    }, err => {
      console.log(err);
    });
  }

  deleteUser(id: string){
    this.taskService.deleteTask(id).subscribe(res => {
    }, err => {
      console.log(err);
    });
    this.fetchUsers();
  }

}

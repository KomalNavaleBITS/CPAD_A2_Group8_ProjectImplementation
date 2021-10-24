import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { TasksService } from '../services/tasks.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  myModel: any;
  assignmentdetailmodel: any;

  taskModel: any;
  userModel: any;


  assignmentList: any;

  username: any;

  isEdit = false;

  editUserData:any;

  userList: any;
  taskList: any;

  idDetailModel :any;
  usernameDetailModel: any;
  tasknameDetailModel: any;

  constructor(
    private assignmentService: AssignmentService,
    private tasksService: TasksService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchTasks();
    this.fetchAssignments();
  }

  fetchTasks(){
    this.tasksService.fetchTasks().subscribe(res => {
      this.taskList = res;
    }, err => {
      console.log(err);
    });
  }

  fetchUsers(){
    this.userService.fetchUsers().subscribe(res => {
      this.userList = res;
    }, err => {
      console.log(err);
    });
  }

  fetchAssignments(){
    this.assignmentService.fetchAssignments().subscribe(res => {
      this.assignmentList = res;
    }, err => {
      console.log(err);
    });
  }

  createAssignment(){
    console.log(this.taskModel);
    console.log(this.userModel);

    // const data = {
    //   taskid: this.taskModel._id,
    //   userid: this.userModel._id
    // }

    this.assignmentService.createAssignment(this.taskModel._id,this.userModel._id).subscribe(res => {
      this.fetchAssignments();
      this.taskModel = '';
      this.userModel = '';
    }, err => {
      console.log(err);
    });
  }

  editUserPopulate(editUser:any){
    this.myModel = editUser.displayname;
    this.editUserData = editUser;

    this.isEdit = true;
  }

  viewAssignmentDetails(id: string){
    this.assignmentService.getAssignmentsDetails(id).subscribe(res => {
      console.log('res');
      console.log(res._id);
      // this.assignmentdetailmodel=res.assignmentid;
      this.idDetailModel=res.assignmentid;
      this.usernameDetailModel=res.username;
      this.tasknameDetailModel=res.taskname;
     
    }, err => {
      console.log(err);
    });
  }

  deleteAssignment(id: string){
    this.assignmentService.deleteAssignment(id).subscribe(res => {
    }, err => {
      console.log(err);
    });
    this.fetchAssignments();
  }


}

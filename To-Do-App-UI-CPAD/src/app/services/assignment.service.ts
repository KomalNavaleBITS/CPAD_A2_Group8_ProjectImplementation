import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../helpers/http-client.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  baseUrl = 'https://assignmentservice.azurewebsites.net';
  constructor(
    private _httpClientService: HttpClientService,
    private _httpClient: HttpClient,
  ) { }


  fetchAssignments(){
  const URL = this.baseUrl + '/'+'getassignments';
  const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  return this._httpClient.get<any>(URL, config)
          .pipe(map(res => {
      console.log(res);
    
      return res;
      }),
      err => {
          return err;
      });

  }

  getAssignmentsDetails(id: string){
    const URL = this.baseUrl + '/'+'getassignmentdetail'+'/'+id;
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    console.log(URL);
    return this._httpClient.get<any>(URL, config)
            .pipe(map(res => {
        console.log(res);
      
        return res;
        }),
        err => {
            return err;
        });
  
    }

  createAssignment(taskid: any,userid: any) {
    const data = {'taskid': taskid,'userid': userid};
    const URL = this.baseUrl + '/'+'addassignment';
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this._httpClient.post<any>(URL, data, config)
            .pipe(map(res => {
      
      if (res.user === true) {
          localStorage.setItem('currentUser', res.user);
          localStorage.setItem('role', res.role);
      }
      return res;
      }),
      err => {
          return err;
      });

  }

  updateTask(name: any, id: any) {
    const data = {'name': name};
    const URL = this.baseUrl + '/'+'edittask'+'/'+ id;
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this._httpClient.post<any>(URL, data, config)
            .pipe(map(res => {
      console.log(res);
      if (res.user === true) {
          localStorage.setItem('currentUser', res.user);
          localStorage.setItem('role', res.role);
      }
      return res;
      }),
      err => {
          return err;
      });

  }


  deleteAssignment(id: string) {
    const data = {'id': id};
    const URL = this.baseUrl + '/'+'deleteassignment'+'/'+ id;
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this._httpClient.delete<any>(URL, config)
            .pipe(map(res => {
        console.log(res);
       
        return res;
        }),
        err => {
            return err;
        });
  }
}

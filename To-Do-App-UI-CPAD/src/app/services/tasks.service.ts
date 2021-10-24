import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../helpers/http-client.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl = 'https://tasknotesservice.azurewebsites.net';
  constructor(
    private _httpClientService: HttpClientService,
    private _httpClient: HttpClient,
  ) { }


fetchTasks(){
  const URL = this.baseUrl + '/'+'gettasks';
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

  addTask(name: any) {
    const data = {'displayname': name};
    const URL = this.baseUrl + '/'+'addtask';
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


  deleteTask(id: string) {
    const data = {'id': id};
    const URL = this.baseUrl + '/'+'deletetask'+'/'+ id;
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

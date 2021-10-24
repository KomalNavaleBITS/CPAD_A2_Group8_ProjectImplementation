import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../helpers/http-client.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'https://userservice.azurewebsites.net';
  constructor(
    private _httpClientService: HttpClientService,
    private _httpClient: HttpClient,
  ) { }

//   addUsers(_dataObj: any): Observable<any> {
//     const URL = this.baseUrl + '/'+'adduser';
//     const t = {name : 'Ayushi'}

//     return this._httpClientService.post(URL, t);
// }





fetchUsers(){
  const URL = this.baseUrl + '/'+'getusers';
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

  addUser(name: any) {
    const data = {'name': name};
    const URL = this.baseUrl + '/'+'adduser';
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

  updateUser(name: any, id: any) {
    const data = {'name': name};
    const URL = this.baseUrl + '/'+'edituser'+'/'+ id;
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


  deleteUser(id: string) {
    const data = {'id': id};
    const URL = this.baseUrl + '/'+'deleteuser'+'/'+ id;
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

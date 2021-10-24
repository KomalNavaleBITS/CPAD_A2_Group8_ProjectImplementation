import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';


import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpClientService {
  private _baseUrl: string = 'http://localhost:8081/';
  private _httpClient: HttpClient;
//   private _sharedService: SharedService;
//   private _loaderService: LoaderService;
  private _location: Location;
  
  
  constructor(
    httpClient: HttpClient,
    // sharedService: SharedService,
    // loaderService: LoaderService,
    location: Location,    
    // private _store: Store<fromAuth.State>,
    // private _state: State<fromAuth.State>,
    private router: Router
  ) {
    this._httpClient = httpClient;
    // this._sharedService = sharedService;
    // this._loaderService = loaderService;
    this._location = location;
  }

  login(url: any) {
    const data = {'name': 'Ayushi'};
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this._httpClient.post<any>(url, data, config)
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


  get(url: any) {
    // this.showLoader();
    return this._httpClient
      .get(url).pipe(map((response: any) => {
        // return this._verifySMBError(response);
        return response;
      })).pipe(catchError ((error: any) => {
        // this.hideLoader();
        throw Observable.throw(error);
      }));
  }

  post(url: any, data: any) {
  
    return this._httpClient
      .post(url, httpOptions)
      .pipe(map((response: any) => {
        return response;
      })).pipe(
      catchError((error: Response) => {
        throw Observable.throw(error);
      }));
  }

//  private _addTokensToStore(data: any): any {
//     const _data = data || {};
//     let _authState = this._state.getValue().auth;

//     if(_authState.auth.tokens.ST===""){
//      this._updateTokensInStore(this._sharedService.getUserInfo());
//      _authState = this._state.getValue().auth;
//     }
//     return Object.assign(_data, _authState.auth.tokens);
//   }

//   private _updateTokensInStore(response: any) {
//     if (response && (response.ST || response.XT)) {
//       const _tokensObj = { ST: response.ST || '', XT: response.XT || '' };
//       this._store.dispatch(new UpdateTokensAction(_tokensObj));
//     }

//     if (response && (response.ST)) {
//       if (this._sharedService.getUserInfo()) {
//         let data = this._sharedService.getUserInfo();
//         data.ST = response.ST;
//         this._sharedService.setLocalStorage('currentUser', JSON.stringify(data));

//       }
//     }
//   }

//   private _checkforLogout(response: any) {
//     if (response && (response.HRC===300)) {
//       this.logout();     
//     }
//   }

//   private _addTokensToDataObj(data: any): any {
//     const _data = data || {};
//     const _tokenObj = { ST: this._sharedService.getUserInfo().ST, XT: '' };
//     return Object.assign(_data, _tokenObj);
//   }

//   private _verifySMBError(response: any): any {
//     this.hideLoader();
//     if (!response) {
//       console.error('API response is null or undefined');
//       throw Observable.throw('API response is null or undefined');
//     } else if (response && response.RSV === -50) {
//       const SMBError = {
//         httpErrorCode: response.HRC,
//         httpErrorMessage: response.HRM,
//         serverMessage: response.RSM
//       };
//       console.error(SMBError);
//       throw Observable.throw(SMBError);
//     } else {
//       return response;
//     }
//   }
//   private showLoader(): void {
//     this._loaderService.display(true);
//   }

//   private hideLoader(): void {
//     this._loaderService.display(false);
//   }
}

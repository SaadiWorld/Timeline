import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
// Because we are working with observables
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  // Properties of this service
  authToken: any;
  user: any;

  constructor(private http: HttpClient,
    public jwtHelper: JwtHelperService) { }

  // This is where we actually reach into our backend API and make post request to register
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    // Returning Observable with response
    return this.http.post('http://localhost:8000/api/v1/users/register', user, { headers: headers })
      .pipe(map(res => res));
  }


  // This is where we actually reach into our backend API and make post request to login
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    // Returning Observable with response
    return this.http.post('http://localhost:8000/api/v1/users/login', user, { headers: headers })
      .pipe(map(res => res));
  }


  // gettimeline() {
  //   let headers = new HttpHeaders();
  //   this.loadtoken();
  //   //window.alert(this.authToken); Token Fetch ho rha hai
  //   headers.append('Authorization', `Bearer ${this.authToken}`); // was having 401 error in console because of writing THIS.AUTHTOKEN
  //   headers.append('Content-Type', 'application/json');
  //   //window.alert(headers);
  //   return this.http.get('http://localhost:8000/api/v1/timeline', { headers: headers }) // withCredentials: true 
  //     .pipe(map(res => res));
  //   // .pipe(map(res => { return res; }));
  // }


  gettimeline(): any {
    this.loadtoken();
    let headers = new HttpHeaders().append('Authorization', `Bearer ${this.authToken}`).append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8000/api/v1/timeline', { headers: headers });
  }


  // This is where we actually store the logged-in user data in local storage
  storeUserData(token, user) {
    localStorage.setItem('token_id', token);
    localStorage.setItem('user_info', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  loadtoken() {
    const token = localStorage.getItem('token_id');
    this.authToken = token;
  }


  // loggedIn() {
  //   return this.jwtHelper.isTokenExpired('token_id');
  // }

  loggedIn() {
    this.loadtoken();
    if (this.authToken == undefined) {
      return false;
    } else {
      const helper = new JwtHelperService();
      // console.log(helper.isTokenExpired(this.authToken));
      return !helper.isTokenExpired(this.authToken); // other people are putting 'id_token'' here but it didn't work for me so i just put the localStorage item
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // addEvent(event) {
  //   let headers = new HttpHeaders();
  //   this.loadtoken();
  //   headers.append('Authorization', `Bearer ${this.authToken}`); // was having 401 error in console because of writing THIS.AUTHTOKEN
  //   headers.append('Content-Type', 'application/json');
  //   // Returning Observable with response
  //   return this.http.post('http://localhost:8000/api/v1/timeline/add', event, { headers: headers })
  //     .pipe(map(res => res));
  // }


  addEvent(event): any {
    this.loadtoken();
    let headers = new HttpHeaders().append('Authorization', `Bearer ${this.authToken}`).append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/v1/timeline/add', event, { headers: headers })
      .pipe(map(res => res));
  }

  // deletePost(id) {
  //   let headers = new HttpHeaders();
  //   this.loadtoken();
  //   headers.append('Authorization', `Bearer ${this.authToken}`); // was having 401 error in console because of writing THIS.AUTHTOKEN
  //   headers.append('Content-Type', 'application/json');

  //   return this.http.delete(`http://localhost:8000/api/v1/timeline/delete/${id}`, { headers: headers })
  //     .pipe(map(res => res));
  // }

  deletePost(id) {
    this.loadtoken();
    let headers = new HttpHeaders().append('Authorization', `Bearer ${this.authToken}`).append('Content-Type', 'application/json');
    return this.http.delete(`http://localhost:8000/api/v1/timeline/delete/${id}`, { headers: headers })
      .pipe(map(res => res));
  }

  getEvent(id) {
    this.loadtoken();
    let headers = new HttpHeaders().append('Authorization', `Bearer ${this.authToken}`).append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:8000/api/v1/timeline/edit/${id}`, { headers: headers })
      .pipe(map(res => res));
  }

  // editEvent(id, event) {
  //   let headers = new HttpHeaders();
  //   this.loadtoken();
  //   headers.append('Authorization', `Bearer ${this.authToken}`); // was having 401 error in console because of writing THIS.AUTHTOKEN
  //   headers.append('Content-Type', 'application/json');
  //   // Returning Observable with response
  //   return this.http.post(`http://localhost:8000/api/v1/timeline/edit/${id}`, event, { headers: headers })
  //     .pipe(map(res => res));
  // }

  editEvent(id, event) {
    this.loadtoken();
    let headers = new HttpHeaders().append('Authorization', `Bearer ${this.authToken}`).append('Content-Type', 'application/json');
    return this.http.post(`http://localhost:8000/api/v1/timeline/edit/${id}`, event, { headers: headers })
      .pipe(map(res => res));
  }
}

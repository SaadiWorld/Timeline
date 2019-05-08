import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { map } from "rxjs/operators";
// Because we are working with observables
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
  // Properties of this service
  authToken: any;
  user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  // This is where we actually reach into our backend API and make post request to register
  registerUser(user) {
    // Returning Observable with response
    return this.http.post("/api/v1/users/register", user).pipe(map(res => res));
  }

  // This is where we actually reach into our backend API and make post request to login
  authenticateUser(user) {
    // Returning Observable with response
    return this.http.post("/api/v1/users/login", user).pipe(map(res => res));
  }

  gettimeline(): any {
    return this.http.get("/api/v1/timeline");
  }

  // This is where we actually store the logged-in user data in local storage
  storeUserData(token, user) {
    localStorage.setItem("token_id", token);
    localStorage.setItem("user_info", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    if (this.authToken == undefined) {
      return false;
    } else {
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(this.authToken); // other people are putting 'id_token'' here but it didn't work for me so i just put the localStorage item
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  addEvent(event): any {
    return this.http.post("/api/v1/timeline/add", event).pipe(map(res => res));
  }

  deletePost(id) {
    return this.http
      .delete(`/api/v1/timeline/delete/${id}`)
      .pipe(map(res => res));
  }

  getEvent(id) {
    return this.http.get(`/api/v1/timeline/edit/${id}`).pipe(map(res => res));
  }

  editEvent(id, event) {
    return this.http
      .post(`/api/v1/timeline/edit/${id}`, event)
      .pipe(map(res => res));
  }
}

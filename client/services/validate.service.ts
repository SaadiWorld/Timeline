import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name == undefined || user.name.length == 0 || user.username == undefined || user.username.length == 0
      || user.email == undefined || user.email.length == 0 || user.password == undefined || user.password.length == 0
      || user.password2 == undefined || user.password2.length == 0) {
      return false;
    } else
      return true;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(user) {
    if (user.password !== user.password2) {
      return false;
    } else
      return true;
  }
}

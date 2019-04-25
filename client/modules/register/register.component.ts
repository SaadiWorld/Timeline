import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  password2: String;

  // Injecting Service into the component
  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      password2: this.password2
    }

    // Checking if all the fields are not filled
    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validatePassword(user)) {
      this.flashMessage.show('Passwords do not match', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if ((data as any).success) {
        this.flashMessage.show('You are now registered and can login', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(`Registration Failed because ${(data as any).message}`, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }
}
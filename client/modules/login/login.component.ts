import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }

    // Authenticate User
    this.authService.authenticateUser(user).subscribe(data => {
      if ((data as any).success) {
        // window.alert((data as any).success);
        // window.alert((data as any).token);
        this.authService.storeUserData((data as any).token, (data as any).user);
        this.flashMessage.show((data as any).message, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['timeline']);
      } else {
        this.flashMessage.show((data as any).message, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    });
  }
}

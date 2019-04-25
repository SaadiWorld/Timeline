import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { provideForRootGuard } from '@angular/router/src/router_module';
import { AddTimelineComponent } from './add-timeline/add-timeline.component';

import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages/module';     // Adding '/module' saved me from error
import { AuthGuard } from '../guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard] },
  { path: 'timeline/add', component: AddTimelineComponent, canActivate: [AuthGuard] }
]

export function tokenGetter() {
  return localStorage.getItem('token_id');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TimelineComponent,
    AddTimelineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

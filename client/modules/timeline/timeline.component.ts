import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;

  // isodd = false;

  // public get changeOdd() {
  //   this.isodd = !this.isodd;
  //   return true;
  // }

  events: any[];
  post_to_delete: any;
  post_to_edit: any;
  id: String;
  title: String;
  description: String;

  constructor(private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.gettimeline().subscribe(data => {
      console.log((data as any).success);
      this.events = (data as any).events;
    }, (err) => {
      console.log("Not successful");
      return false;
    });
  }

  setDelete(event) {
    this.post_to_delete = event;
  }

  unsetDelete() {
    this.post_to_delete = null;
  }

  setEdit(event) {
    this.post_to_edit = event;
    this.authService.getEvent(this.post_to_edit).subscribe(res => {
      if ((res as any).success) {
        // this.flashMessage.show('Event is deleted!', { cssClass: 'alert-success', timeout: 3000 });
        this.title = (res as any).title;
        this.description = (res as any).description;
        //this.editEvent();
        //this.closeBtn2.nativeElement.click();
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/timeline']);
      }
    })
  }

  unsetEdit() {
    // this.post_to_edit = null;
    this.title = null;
    this.description = null;
  }

  deletePost() {
    this.authService.deletePost(this.post_to_delete).subscribe(res => {
      if ((res as any).success) {
        // this.flashMessage.show('Event is deleted!', { cssClass: 'alert-success', timeout: 3000 });
        this.closeBtn.nativeElement.click();
        this.authService.gettimeline().subscribe(data => {
          console.log((data as any).success);
          this.events = (data as any).events;
        }, (err) => {
          console.log("Not successful");
          return false;
        });

      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/timeline']);
      }
    })
  }

  editEvent() {
    //this.unsetEdit();
    const id = this.post_to_edit;
    const event = {
      title: this.title,
      description: this.description
    }

    // Edit Event
    this.authService.editEvent(id, event).subscribe(data => {
      if ((data as any).success) {
        this.closeBtn2.nativeElement.click();
        this.closeBtn.nativeElement.click();
        this.authService.gettimeline().subscribe(data => {
          console.log((data as any).success);
          this.events = (data as any).events;
        }, (err) => {
          console.log("Not successful");
          return false;
        });
      } else {
        this.flashMessage.show('Operation Failed', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/timeline/']);
      }
    });
  }
}


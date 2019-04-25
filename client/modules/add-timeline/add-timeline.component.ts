import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-timeline',
  templateUrl: './add-timeline.component.html',
  styleUrls: ['./add-timeline.component.scss']
})
export class AddTimelineComponent implements OnInit {
  title: String;
  description: String;

  constructor(private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onEventSubmit() {
    const event = {
      title: this.title,
      description: this.description
    }

    // Add Event
    this.authService.addEvent(event).subscribe(data => {
      if ((data as any).success) {
        this.flashMessage.show('You event has been published', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/timeline']);
      } else {
        this.flashMessage.show('Submission Failed', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/timeline/add']);
      }
    });
  }
}
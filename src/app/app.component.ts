import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'CM BFS';
  public validinput: RegExp = /^[^\s]+(\s+[^\s]+)*$/;
  constructor(dateTimeAdapter: DateTimeAdapter<any>,
    private router: Router) {
    dateTimeAdapter.setLocale('en-in');
  }

  ngOnInit(): void {
    if (environment.production) {
      if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
      }
    }

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/monthlyreport'
          || e.url.startsWith('/users/')
          || e.url.startsWith('/dashboard')
        ) {
          document.body.classList.add('removeglobalfilter');
        } else {
          document.body.classList.remove('removeglobalfilter');
        }
      }
    });
  }

  clearAllData() {
  }

}

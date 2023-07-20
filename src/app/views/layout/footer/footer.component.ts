import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();
  appVersion: any;

  constructor(private userService: UserService,) { }

  ngOnInit(): void {

    this.getAppVersion(true);
  }

  getAppVersion(refresh: any) {
    // this.userService.getAppVersion(3, true).subscribe(result => {
    //   if (result) {
    //     this.appVersion = result;
    //   }
    // });
  }
}

import { Component, OnInit } from '@angular/core';
import { StorageKeys } from '../models/StorageKeys';
import { User } from '../models/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mini = true;
  authenticated = false;
  user: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // auth state
    const user = this.authService.getFromStorage(StorageKeys.USER);
    if (user !== null) {
      this.authenticated = true;
      this.user = JSON.parse(user);
    }
  }

  // tslint:disable-next-line: typedef
  toggleSidebar() {
    if (this.mini) {
      console.log('opening sidebar');
      const mysidebar = document.getElementById('mySidebar') as HTMLElement;

      mysidebar.setAttribute('style', 'width:170px');
      const main = document.getElementById('main') as HTMLElement;
      main.setAttribute('style', 'marginLeft:170px');
      this.mini = false;
    } else {
      console.log('closing sidebar');
      const mysidebar = document.getElementById('mySidebar') as HTMLElement;
      mysidebar.setAttribute('style', 'width:50px');
      const main = document.getElementById('main') as HTMLElement;
      main.setAttribute('style', 'marginLeft:50px');
      this.mini = true;
    }
  }

  // tslint:disable-next-line: typedef
  closeNav() {
    const element = document.getElementById('mySidebar') as HTMLElement;
    element.setAttribute('style', 'width:0px');
    const elem = document.getElementById('main') as HTMLElement;
    elem.setAttribute('style', 'marginLeft:0px');

  }

  logout(): void {
    this.authService.logout();
  }

}

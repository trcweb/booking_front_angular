import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/models/StorageKeys';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated = false;
  user: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getFromStorage(StorageKeys.USER);
    if (user !== null) {
      this.authenticated = true;
      this.user = JSON.parse(user);
    }
  }

  openNav(): void {
    const element = document.getElementById('mySidebar') as HTMLElement;
    element.setAttribute('style', 'width:100%');

    const elem = document.getElementById('main') as HTMLElement;
    elem.setAttribute('style', 'marginLeft:250px');
  }

  logout(): void {
    this.authService.logout();
  }
}

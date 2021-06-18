import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mini = true;

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  toggleSidebar() {
    if (this.mini) {
      console.log('opening sidebar');
      const mysidebar = document.getElementById('mySidebar') as HTMLElement;
      mysidebar.setAttribute('style', 'width:150px; box-shadow: 11px -8px 14px 2px rgba(0, 0, 0, 0.3);');
      this.mini = false;
    } else {
      console.log('closing sidebar');
      const mysidebar = document.getElementById('mySidebar') as HTMLElement;
      mysidebar.setAttribute('style', 'width:50px');
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
}

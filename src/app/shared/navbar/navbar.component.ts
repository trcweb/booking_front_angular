import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openNav() {
    
    let element = document.getElementById("mySidebar") as HTMLElement;
    element.setAttribute("style", "width:100%");
    
    let elem = document.getElementById("main") as HTMLElement;
    elem.setAttribute("style", "marginLeft:250px");
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 mini = true;

  toggleSidebar() {
    
    if (this.mini) {
      console.log("opening sidebar");
          
      let mysidebar = document.getElementById("mySidebar") as HTMLElement;
        
      mysidebar.setAttribute("style", "width:170px");
      let main = document.getElementById("main") as HTMLElement;
      main.setAttribute("style", "marginLeft:170px");
          
      this.mini = false;
    } else {
      console.log("closing sidebar");
      let mysidebar = document.getElementById("mySidebar") as HTMLElement;
      mysidebar.setAttribute("style", "width:50px");
      let main = document.getElementById("main") as HTMLElement;
      main.setAttribute("style", "marginLeft:50px");
      this.mini = true;
    }
      
  }




    
  
   
  

  
  closeNav() {
    let element = document.getElementById("mySidebar") as HTMLElement;
    element.setAttribute("style", "width:0px");
    let elem = document.getElementById("main") as HTMLElement;
    elem.setAttribute("style", "marginLeft:0px");

     
  }
}

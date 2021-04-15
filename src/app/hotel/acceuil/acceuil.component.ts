import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

 


  constructor() { }

  ngOnInit(): void {
  }


 
  
 


  

  openmodal() {
    console.log('hhhhh');
    
    // Get the button that opens the modal
    let btn = document.getElementById("myBtn") as HTMLElement;
    let modal = document.getElementById("myModal") as HTMLElement;
     let body = document.querySelector("body") as HTMLElement;
    // When the user clicks on the button, open the modal
    modal.setAttribute("style", "display:block");
   
    body.setAttribute("style", "overflow:hidden");
  }

  closemodal() {
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0] as HTMLElement;
    let modal = document.getElementById("myModal") as HTMLElement;
    // When the user clicks on <span> (x), close the modal
    modal.setAttribute("style", "display:none;");

  }
  





}

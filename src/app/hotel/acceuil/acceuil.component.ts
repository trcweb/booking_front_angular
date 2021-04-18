import { Chambre } from './../../models/Chambre';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { read } from 'fs';
import { Script } from 'vm';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

 
  
  isReadonly = true;

  listechambre: Chambre[] = [new Chambre(1,0)];
  disabled = false;
   
 
   
  constructor() {
    
   
  }
 
  ngOnInit(): void {
 
  
  }

  plus(index: number, type: string) {
    if (type == "adult") {
      if (this.listechambre[index].adult < 9) {
        this.listechambre[index].adult++;
      }
    } else {
      if (this.listechambre[index].enfant < 9) {
        this.listechambre[index].enfant++;
      }
    }
    
  }

  moin(index: number, type: string) {
    if (type == "adult") {
      if (index == 0) {
        if (this.listechambre[index].adult > 1) {
          this.listechambre[index].adult--;
        }
      }else {
        if (this.listechambre[index].adult > 0) {
          this.listechambre[index].adult--;
        }
      }
    }else {
      if (this.listechambre[index].enfant > 0) {
        this.listechambre[index].enfant--;
      }
    }
  }
   /* if (index == 0) {
      if (this.listechambre[index] > 1) {
        this.listechambre[index]--;
      }
    } else {
      if (this.listechambre[index] > 0) {
        this.listechambre[index]--;
      }
    }*/
    
  

  addChamber() {
    if (this.listechambre.length < 9) {
      this.listechambre.push(new Chambre(0,0));
      if (this.listechambre.length == 9) {
        this.disabled = true;
      }
    } 
  }

  
 
  removeChamber(index: number) {
    this.listechambre.splice(index, 1);    
  }
  

  


 
  
 


  

  openmodal() {
    
    
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
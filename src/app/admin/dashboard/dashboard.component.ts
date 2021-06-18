import { Component, OnInit } from '@angular/core';
import { constants } from 'node:buffer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  panelOpenState = false;


  constructor() { }

  ngOnInit(): void {

}
}
import { element } from 'protractor';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booking';



  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 400) {
      document.querySelector('.masthead')?.classList.remove('hide')
    }
    else {
      document.querySelector('.masthead')?.classList.add('hide')

    }
  }
}


import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LaDulceTradicion';
  isShow: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isShow = window.scrollY > 100;
  }
scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}

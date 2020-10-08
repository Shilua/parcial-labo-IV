import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public isCollapsed = true;
  constructor() {}

  ngOnInit(): void {}

  toggleMenu() {
    console.log(this.isCollapsed);
    this.isCollapsed = !this.isCollapsed;
  }
}

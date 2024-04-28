import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit(): void {}

  //function to navigate to movies view
  public openMoviesView(): void {
    this.router.navigate(['movies']);
  }

  //function to navigate to profile view
  public openUserProfile(): void {
    this.router.navigate(['profile']);
  }

  //function to logout - clears user login data and redirects to homepage
  public logout(): void {
    localStorage.setItem('user','');
    localStorage.setItem('token','');
    this.router.navigate(['welcome']);
  }
}

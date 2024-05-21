import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @description Component representing the navigation bar.
 * @selector 'app-nav-bar'
 * @templateUrl './nav-bar.component.html'
 * @styleUrl './nav-bar.component.scss'
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  /**
   * @constructor - Constructor for NavBarComponent
   * @param {Router} router - Router service for navigation between views
   */
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * Function to navigate to movies view
   */
  public openMoviesView(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Function to navigate to user profile view
   */
  public openUserProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Function to logout user, then navigating to welcome view/homepage
   */
  public logout(): void {
    localStorage.setItem('user','');
    localStorage.setItem('token','');
    this.router.navigate(['welcome']);
  }
}

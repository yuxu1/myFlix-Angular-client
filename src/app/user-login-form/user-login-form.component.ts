import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService} from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
//this import is used to implement routing at successful login
import { Router } from '@angular/router';

/**
 * @description Component representing the user login form
 * @selector 'app-user-login-form'
 * @templateUrl './user-login-form.component.html'
 * @styleUrl './user-login-form.component.scss'
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  //define an input
  @Input() userData = { Username: '', Password: ''};

  /**
   * @constructor - Constructor for UserLoginFormComponent
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Material dialog service for displaying dialogs
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying snack-bar notifications
   * @param {Router} router - Router service for navigation between views
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      private router: Router
  ) { }

  //method called once component has received all its inputs
  ngOnInit(): void {
  }

  /**
   * Function for sending form inputs to the backend to login a user
   * @returns Message indicating a successful or unsuccessful login, then routes to movies view if successful
   */
  loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        // Logic for a successful user login
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); //close the modal on success
        console.log(result);
        this.snackBar.open('Login Successful', 'OK', {
            duration: 2000
        });
        this.router.navigate(['movies'])
      }, (result) => {
        console.log(result);
        this.snackBar.open('Login failed', 'OK', {
          duration: 2000
        });
      });
    }

  }



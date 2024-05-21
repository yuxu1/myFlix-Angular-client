import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService} from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component representing the user registration form
 * @selector 'app-user-registration-form'
 * @templateUrl './user-registration-form.component.html'
 * @styleUrls ['./user-registration-form.component.scss']
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  //define an input to be passed into API call in registerUser function
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @constructor - Constructor for UserRegistrationFormComponent
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Material dialog service for displaying dialogs
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying snack-bar notifications
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

  //method called once component has received all its inputs
  ngOnInit(): void {
  }

  /**
   * Function to send the form inputs to the backend to create a user
   * @returns Message indicating successful user registration
   */
  registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user 
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('User registration successful', 'OK', {
          duration: 2000
      });
      }, (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }

  }
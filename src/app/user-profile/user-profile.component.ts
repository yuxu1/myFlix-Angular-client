import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';

/**
 * @description Component representing the user profile view
 * @selector 'app-user-profile'
 * @templateUrl './user-profile.component.html'
 * @styleUrl './user-profile.component.scss'
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };

  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  /**
   * @constructor - Constructor for UserProfileComponent
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API
   * @param {MatDialog} dialog - Material dialog service for displaying dialogs
   * @param {MatSnackBar} snackbar - Material snack bar service for displaying snack-bar notifications
   * @param {Router} router - Router service for navigation between views
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getMovies();
    this.getFavMovies();
  }

  /**
   * Function to fetch user data from FetchApiDataService service
   * @returns user's data, including username, email, birthday, and favorite movies
   */
  getUserProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.fetchApiData.getAllMovies().subscribe((result) => {
      this.favoriteMovies = result.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  /**
   * Function to retrieve user's favorite movies
   * @returns user's favorite movies
   */
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.favoriteMovies = this.user.FavoriteMovies;
  }

  /**
   * Function to update user information
   * @returns Message indicating successful or unsuccessful update of user information
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user',JSON.stringify(result));
      this.snackbar.open('user updated successfully', 'OK', {
        duration: 3000
      });
    }, (error) => {
      console.error('User update not successful:', error);
      this.snackbar.open('user update not successful', 'OK', {
        duration: 3000
      });
    });
  }

  /**
   * Function to delete a user profile after user confirmation of action
   * @returns Message indicating successful deletion of user and route to homepage after deletion
   */
  deleteUser(): void {
    if(confirm('Are you sure you want to delete your account permanently?')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.clear();
        this.snackbar.open('Your account has been deleted','OK', {
          duration: 3000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
      });
    }
  }

  /**
   * Function to fetch all movies from API
   * @returns All movies
   */
  getMovies():void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Function that opens the movie synopsis dialog
   * @param {string} description - Description of the movie
   * @returns Description of the movie displayed in a dialog
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Description: description
      },
      width: '480px'
    });
  }

  /**
   * Function that opens the genre dialog
   * @param {string} name - Name of the movie's genre
   * @param {string} description - Description of the genre
   * @returns Name and description of the genre in a dialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDetailsComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '480px'
    });
  }

  /**
   * Function that opens the director dialog
   * @param {string} name - Name of the director
   * @param {string} bio - Biography of the director
   * @param {string} birthyear - Birth year of the director
   * @param {string} deathyear - Death year of the director, if applicable
   */
  openDirectorDialog(name:string, bio:string, birthyear:string, deathyear:string): void {
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthyear: birthyear,
        Deathyear: deathyear
      },
      width: '480px'
    });
  }

  /**
   * Function to remove a movie from user's favorites
   * @param {any} movie - Movie to be removed from user's favorite movies
   * @returns Message indicating successful removal of movie from favorites
   */
  removeFav(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.removeFavorites(movie).subscribe((result) => {
      localStorage.setItem('user',JSON.stringify(result));
      this.getFavMovies();
      this.getUserProfile();
      this.snackbar.open('Movie has been removed from favorites','OK', {
        duration: 5000
      });
    });
  }
}

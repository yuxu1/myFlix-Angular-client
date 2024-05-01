import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';

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

  //function to fetch user data from FetchApiDataService service
  getUserProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.userData.Password = this.user.Password;
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.fetchApiData.getAllMovies().subscribe((result) => {
      this.favoriteMovies = result.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  //function to retrieve favorite movies
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.favoriteMovies = this.user.FavoriteMovies;
  }

  //function to update user information
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

  //function to delete user profile
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

  //function to get all movies
  getMovies():void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Description: description
      },
      width: '480px'
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDetailsComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '480px'
    });
  }

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

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component representing the movie card
 * @selector 'app-movie-card'
 * @templateUrl './movie-card.component.html'
 * @styleUrls ['./movie-card.component.scss']
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  movies: any[] = [];
  FavoriteMovies: any[] = []
  user: any = {};

  /**
   * @constructor - Constructor for MovieCardComponent
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API
   * @param {MatDialog} dialog - Material Dialog service for opening dialogs
   * @param {MatSnackBar} snackbar - Material Snack Bar service for displaying snack-bar notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Function to fetch all movies from FetchApiDataService service
   * @returns All movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
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
   * Function to get user's list of favorite movies
   * @returns User's favorite movies
   */
  getFavoriteMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log(this.FavoriteMovies);
  }

  /**
   * Function to check if a movie is favorited by the user
   * @param {any} movie - Movie object to check
   * @returns {boolean} - Boolean indicating whether or not the movie is in user's favorite movies list
   */
  isFavorited(movie: any): boolean {
    return this.user.FavoriteMovies.indexOf(movie._id) >= 0;
  }

  /**
   * Function to trigger removeFavMovie and addFavMovie functions by clicking the icon button
   * @param {any} movie - Movie object to toggle favorites status
   */
  toggleFavorite(movie: any): void {
    const isFavorited = this.isFavorited(movie);
    isFavorited ? this.removeFavMovie(movie): this.addFavMovie(movie);
  }

  /**
   * Function to remove a movie from user's favorites
   * @param {any} movie - Movie to be removed from user's favorite movies
   * @returns Message indicating successful removal of movie from favorites
   */
  removeFavMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.fetchApiData.removeFavorites(movie).subscribe((result) => {
      localStorage.setItem('user',JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackbar.open('Movie has been removed from favorites','OK', {
        duration: 5000
      });
    });
  }

  /**
   * Function to add a movie to user's favorites
   * @param {any} movie - Movie to be added to user's favorite movies
   * @returns Message indicating successful addition of movie to favorites
   */
  addFavMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.fetchApiData.addFavorites(movie).subscribe((result) => {
      localStorage.setItem('user',JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackbar.open('Movie has been added to favorites','OK', {
        duration: 5000
      });
    });
  }
}
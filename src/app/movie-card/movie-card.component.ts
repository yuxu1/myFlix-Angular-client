import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  movies: any[] = [];
  FavoriteMovies: any[] = []
  user: any = {};
  userData = { Username: '', FavoriteMovies: []};
  isFavMovie: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  //function to fetch movies from FetchApiDataService service
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
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

  getFavoriteMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log(this.FavoriteMovies);
  }

  isFavorited(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  toggleFavorite(movie: any): void {
    const isFavorited = this.isFavorited(movie);
    isFavorited ? this.removeFavMovie(movie): this.addFavMovie(movie);
  }

  removeFavMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.removeFavorites(movie).subscribe((result) => {
      localStorage.setItem('user',JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackbar.open('Movie has been removed from favorites','OK', {
        duration: 5000
      });
    });
  }

  addFavMovie(movie:any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavorites(movie).subscribe((result) => {
      localStorage.setItem('user',JSON.stringify(result));
      this.getFavoriteMovies();
      this.snackbar.open('Movie has been added to favorites','OK', {
        duration: 5000
      });
    });
  }
}
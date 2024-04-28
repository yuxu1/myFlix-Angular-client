import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  @Input() userData = { Username: '', Email: '', Birthday: '', FavoriteMovies: [] };
  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavMovies();
  }

  //function to fetch movies from FetchApiDataService service
  getUserProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((result) => {
      this.FavoriteMovies = result.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log(this.FavoriteMovies);
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log('User updated successfully:', result);
      localStorage.setItem('user',JSON.stringify(result));
    }, (error) => {
      console.error('User update not successful:', error);
    });
  }

  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
    })
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
  }

  getMovies():void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the movie synopsis/details
 * @selector 'app-movie-details'
 * @templateUrl './movie-details.component.html'
 * @styleUrl './movie-details.component.scss'
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {

  /**
   * @constructor - Constructor for MovieDetailsComponent
   * @param data - Data containing the movie description(synopsis)
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Description: string
    }
  ) {}

  ngOnInit(): void {}
}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the genre details
 * @selector 'app-genre-details'
 * @templateUrl './genre-details.component.html'
 * @styleUrl './genre-details.component.scss'
 */
@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrl: './genre-details.component.scss'
})
export class GenreDetailsComponent implements OnInit {

  /**
   * @constructor - Constructor for GenreDetailsComponent
   * @param data - Data containing genre details,including name and description
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string,
      Description: string
    }
  ) {}

  ngOnInit(): void {

  }
}

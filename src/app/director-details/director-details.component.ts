import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the director details
 * @selector 'app-director-details'
 * @templateUrl './director-details.component.html'
 * @styleUrl './director-details.component.scss'
 */
@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrl: './director-details.component.scss'
})
export class DirectorDetailsComponent implements OnInit {

  /**
   * @constructor - Constructor for DirectorDetailsComponent
   * @param data - Data containing director details,including name, biography, birthyear, deathyear
   */
  constructor (
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string,
      Bio: string,
      Birthyear: string,
      Deathyear: string
    }
  ) {}
  ngOnInit(): void {}
}

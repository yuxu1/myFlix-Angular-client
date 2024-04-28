import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrl: './director-details.component.scss'
})
export class DirectorDetailsComponent implements OnInit {

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

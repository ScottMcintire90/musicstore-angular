import { Component } from 'angular2/core';
import { CD } from './cd.model';

@Component({
  selector: 'cd-display',
  inputs: ['cd', 'cdList'],
  template: `
    <div class="album col-md-4">
      <h3>{{ cd.name }}</h3>
      <ul class="cdList">
        <p><strong>Artist: </strong>{{cd.artist}}</p>
        <p [class.expensive]="cd.price >= 20" [class.inexpensive]="cd.price >= 10 && cd.price < 20" [class.moderate]="cd.price < 10"><strong>Price: </strong>\${{cd.price}}</p>
        <p><strong>Genre: </strong>{{cd.genre}}</p>
        <p>Add to Cart:<input *ngIf="cd.sold" type="checkbox" checked (click)="toggleSold(false)"/>
      <input *ngIf="!cd.sold" type="checkbox" (click)="toggleSold(true)"/>
      </ul>
    </div>
  `
})
export class CDComponent {
  public cd: CD;
  public cdList: CD[];
  toggleSold(setState: boolean) {
    this.cd.sold = setState;
  }
}

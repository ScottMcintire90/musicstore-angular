import { Component } from 'angular2/core';
import { CD } from './cd.model';

@Component({
  selector: 'cd-display',
  inputs: ['cd'],
  template: `
    <div>
      <h3>{{ cd.name }}</h3>
      <ul class="cdList">
        <p><strong>Artist: </strong>{{cd.artist}}</p>
        <p><strong>Price: </strong>\${{cd.price}}</p>
        <p><strong>Genre: </strong>{{cd.genre}}</p>
      </ul>
    </div>
  `
})
export class CDComponent {
  public cd: CD;
}

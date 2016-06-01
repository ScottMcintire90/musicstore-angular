import { Component } from 'angular2/core';
import { CD } from './cd.model';

@Component({
  selector: 'music-store',
  template: `
    <div class"container">
      <h1>Music Store</h1>
      <div class="row">
        <h2>Available CDs</h2>
        <cd-list
          [cdList]="cds">
        </cd-list>
      </div>
    </div>
  `
})
export class AppComponent {
  public cds: CD[];
  constructor() {
    this.cds = [
      new CD("Name 1", "Artist 1", 13, "Genre 1"),
      new CD("Name 2", "Artist 2", 13, "Genre 2"),
      new CD("Name 3", "Artist 3", 13, "Genre 3")
    ];
  }
}

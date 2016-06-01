import { Component } from 'angular2/core';
import { CDListComponent } from './cd-list.component';
import { CD } from './cd.model';

@Component({
  selector: 'music-store',
  directives: [CDListComponent],
  template: `
    <div class="container">
      <h1 class="jumbotron header">Music Store</h1>
        <h2>Available CDs</h2>
        <cd-list
          [cdList]="cds">
        </cd-list>
    </div>
  `
})
export class AppComponent {
  public cds: CD[];
  constructor() {
    this.cds = [
      new CD("Abby Road", "The Beatles", 21, "Rock"),
      new CD("Dark Side of the Moon", "Pink Floyd", 18, "Psychedelic Rock"),
      new CD("Slim Shady", "Eminem", 13, "Rap"),
      new CD("The Chronic", "Dr. Dre", 13, "Rap"),
      new CD("Best of Beethoven", "Beethoven", 6, "Classical")
    ];
  }
}

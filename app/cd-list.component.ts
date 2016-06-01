import { Component, EventEmitter } from 'angular2/core';
import { CDComponent } from './cd.component';
import { CD } from './cd.model';
import { GenrePipe } from './genre.pipe';

@Component({
  selector: 'cd-list',
  inputs: ['cdList'],
  pipes: [GenrePipe],
  directives: [CDComponent],
  template: `
    <select (change)="onChange($event.target.value)" class="filter">
      <option value="all">All Genres</option>
      <option *ngFor="#genre of genres" [value]="genre">{{genre}}</option>
    </select>
    <cd-display *ngFor="#currentCD of cdList | genreSelect:filterSelect"
      (click)="cdClicked(currentCD)"
      [class.selected]="currentCD === selectedCD"
      [cd]="currentCD">
    </cd-display>
  `
})

export class CDListComponent {
  public cdList: CD[];
  public onCDSelect: EventEmitter<CD>;
  public selectedCD: CD;
  public genres = [];
  public filterSelect: string = "all";
  constructor() {
    this.onCDSelect = new EventEmitter();
  }

  cdClicked(clickedCD: CD): void {
    this.selectedCD = clickedCD;
    this.onCDSelect.emit(clickedCD);
  }
  onChange(filterOption) {
    this.filterSelect = filterOption;
  }
  getGenres(): void {
    for(var i=0; i<this.cdList.length; i++) {

      if(!isInArray(this.cdList[i].genre, this.genres)) {
        this.genres.push(this.cdList[i].genre)
      }
    }
    function isInArray(value, array) {
       return array.indexOf(value) >-1;
     }
     console.log(this.genres)
  }
  public ngOnInit(): any {
    this.getGenres();
  }
}

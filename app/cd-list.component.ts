import { Component, EventEmitter } from 'angular2/core';
import { CDComponent } from './cd.component';
import { CD } from './cd.model';
import { GenrePipe } from './genre.pipe';
import { ArtistPipe } from './artist.pipe';

@Component({
  selector: 'cd-list',
  inputs: ['cdList'],
  pipes: [GenrePipe, ArtistPipe],
  directives: [CDComponent],
  template: `
    <label>Filter By Genre</label>
    <select (change)="onChange($event.target.value)" class="filter">
      <option value="all">All Genres</option>
      <option *ngFor="#genre of genres" [value]="genre">{{genre}}</option>
    </select>
    <label>Filter By Artist</label>
    <select (change)="onArtist($event.target.value)" class="filter">
      <option value="all">All Artists</option>
      <option *ngFor="#artist of artists" [value]="artist">{{artist}}</option>
    </select>
    <br>
    <cd-display *ngFor="#currentCD of cdList | genreSelect:filterGenre | artistSelect:filterArtist"
      (click)="cdClicked(currentCD)"
      [class.selected]="currentCD === selectedCD"
      [cd]="currentCD" [cdList]="cdList">
    </cd-display>
    <div class="col-md-12 cart">
      <h2>Shopping Cart</h2>
      <p>Current Albums in your Cart: </p>
      <ul>
        <li *ngFor="#currentCD of soldCDs">{{currentCD.name}}</li>
      </ul>
    </div>
  `
})

export class CDListComponent {
  public cdList: CD[];
  public onCDSelect: EventEmitter<CD>;
  public selectedCD: CD;
  public genres = [];
  public artists = [];
  public filterGenre: string = "all";
  public filterArtist: string ="all";
  public soldCDs: CD[];

  constructor() {
    this.onCDSelect = new EventEmitter();
  }

  cdClicked(clickedCD: CD): void {
    this.selectedCD = clickedCD;
    this.onCDSelect.emit(clickedCD);
  }
  onChange(filterOption) {
    this.filterGenre = filterOption;
  }
  onArtist(filterOption2) {
    this.filterArtist = filterOption2;
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
  }
  getArtists(): void {
    for(var i=0; i<this.cdList.length; i++) {

      if(!isInArray(this.cdList[i].artist, this.artists)) {
        this.artists.push(this.cdList[i].artist)
      }
    }
    function isInArray(value, array) {
       return array.indexOf(value) >-1;
     }
  }
  getSoldCDs(): void {
    this.cdList.forEach(function(cd) {
      if(cd.sold) {
        this.soldCDs.push(cd);
      }
    })
  }
  public ngOnInit(): any {
    this.getGenres();
    this.getArtists();
    this.getSoldCDs();
    console.log(typeof this.soldCDs);
  }
}

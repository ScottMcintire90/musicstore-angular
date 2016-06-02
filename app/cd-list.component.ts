import { Component, EventEmitter } from 'angular2/core';
import { CDComponent } from './cd.component';
import { CD } from './cd.model';
import { GenrePipe } from './genre.pipe';
import { ArtistPipe } from './artist.pipe';
import { NewCDComponent } from './new-cd.component';
import { EditCDDetailsComponent} from './edit-cd-details.component';

@Component({
  selector: 'cd-list',
  inputs: ['cdList'],
  pipes: [GenrePipe, ArtistPipe],
  directives: [CDComponent, NewCDComponent, EditCDDetailsComponent],
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
    <div class="col-md-6 cart">
      <h2>Shopping Cart</h2>
      <button (click)="getSoldCDs()" class="btn btn-success">Add Albums to Cart</button>
      <h3 *ngIf="totalCost > 0">Total Cost: \${{ totalCost }}</h3>
      <p>Current Albums in your Cart: </p>
      <ul>
        <li *ngFor="#currentCD of soldCDs">{{currentCD.name}} \${{currentCD.price}}</li>
      </ul>
    </div>
    <div class="addedit">
      <div class="col-md-6 addCD">
        <new-cd (onSubmitNewCD)="createCD($event)">
        </new-cd>
      </div>
      <div class="col-md-6 editCD">
        <edit-cd-details *ngIf="selectedCD" [cd]="selectedCD">
        </edit-cd-details>
      </div>
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
  public soldCDs: CD[] = [];
  public totalCost: number = 0;

  constructor() {
    this.onCDSelect = new EventEmitter();
  }
  createCD(cd: CD): void {
    this.cdList.push(cd);
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
    this.soldCDs = [];
    this.totalCost = 0;
    var copyThis = this;
    this.cdList.forEach(function(cd) {
      if(cd.sold) {
        copyThis.soldCDs.push(cd);
        copyThis.totalCost+=cd.price;
      }
    })

  }
  public ngOnInit(): any {
    this.getGenres();
    this.getArtists();
    this.getSoldCDs();
  }

}

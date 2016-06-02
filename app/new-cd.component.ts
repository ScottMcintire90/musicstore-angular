import { Component, EventEmitter} from 'angular2/core';
import { CD } from './cd.model';

@Component({
  selector: 'new-cd',
  outputs: ['onSubmitNewCD'],
  template:`
  <div>
  <div class="cd-form">
    <h3>Add a CD</h3>
      <label class="col-sm-6" for="newName">Name</label><input class="col-sm-6 input-lg cd-form" #newName>
      <label class="col-sm-6" for="newArtist">Artist</label><input class="col-sm-6 input-lg cd-form" #newArtist>
      <label class="col-sm-6" for="newPrice">Price</label><input type="number" class="col-sm-6 input-lg cd-form" #newPrice>
      <label class="col-sm-6" for="newGenre">Genre Content</label><input class="col-sm-6 input-lg cd-form" #newGenre>
      <button (click)="addCD(newName, newArtist, newPrice, newGenre)" class="col-sm-6 btn-success btn-lg add-button addCD">Add</button>
  </div>
</div>
  `
})
export class NewCDComponent {
  public onSubmitNewCD: EventEmitter<CD>;
  constructor() {
    this.onSubmitNewCD = new EventEmitter();
  }
  addCD(newName: HTMLInputElement, newArtist: HTMLInputElement, newPrice: HTMLInputElement, newGenre: HTMLInputElement) {
    var cd = new CD(newName.value, newArtist.value, Number(newPrice.value), newGenre.value);
    this.onSubmitNewCD.emit(cd);
  }
}

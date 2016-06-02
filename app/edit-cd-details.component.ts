import { Component } from 'angular2/core';
import { CD } from './cd.model';

@Component({
  selector: 'edit-cd-details',
  inputs: ['cd'],
  template: `
    <h3>Edit CD Details</h3>
    <div class="cd-form">
    <label class="col-md-6" for="cdName">Name</label><input [(ngModel)]="cd.name" class="col-md-6 input-lg keg-form">
    <label class="col-md-6" for="cdArtist">Artist</label><input [(ngModel)]="cd.artist"
    class="col-md-6 input-lg cd-form">
    <label class="col-md-6" for="cdPrice">Price</label><input [(ngModel)]="cd.price"
    class="col-md-6 input-lg cd-form">
    <label class="col-md-6" for="cdGenre">Genre</label><input [(ngModel)]="cd.genre" class="col-md-6 input-lg cd-form">
  </div>
  `
})
export class EditCDDetailsComponent {
  public cd: CD;
}

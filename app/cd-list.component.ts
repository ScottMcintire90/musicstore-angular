import { Component, EventEmitter } from 'angular2/core';
import { CDComponent } from './cd.component';
import { CD } from './cd.model';

@Component({
  selector: 'cd-list',
  inputs: ['cdList'],
  directives: [CDComponent],
  template: `
    <cd-display *ngFor="#currentCD of cdList | emptyState:filterEmpty"
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
  constructor() {
    this.onCDSelect = new EventEmitter();
  }
  cdClicked(clickedCD: CD): void {
    this.selectedCD = clickedCD;
    this.onCDSelect.emit(clickedCD);
  }
}

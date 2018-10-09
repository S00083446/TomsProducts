import { Component, Input, OnChanges, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {

  @Input() rating: number;
  starWidth: number;
  clickNumber: number = 1;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  onClick() {  // check that button is clickec, displays in console
    this.notify.emit('clicked! ' + this.clickNumber + ' times');
    this.clickNumber += 1;
  }
  constructor() { }

  public ngOnChanges(): void {
    this.starWidth = this.rating * 90 / 5;
    console.log(this.starWidth);
  }
}

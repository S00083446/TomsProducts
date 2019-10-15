import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClipartService } from '../shared/clipart.service';

@Component({
  selector: 'app-display-clipart',
  templateUrl: './display-clipart.component.html',
  styleUrls: ['./display-clipart.component.css']
})
export class DisplayClipartComponent implements OnInit {
  // Search string passed down from the add-product component
@Input() imageStr: string;
  // Passsing back up the URL of the selected image
@Output() addImageStringEE: EventEmitter<any> = new EventEmitter();

clipArtData: IOpenClipArt;

  constructor(private _clipArt: ClipartService) { }

  ngOnInit() {
    this._clipArt.getImageList(this.imageStr).subscribe(data => {
      this.clipArtData = data
    });
  }

  // Event to pass up the URL of the image
  selectImage(imageStr): boolean{
    this.addImageStringEE.emit(imageStr);
    return false;
  }
}

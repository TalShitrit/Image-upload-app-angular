import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  address: string
  zoom: Number
  constructor() {

  }

  ngOnInit(): void {
    this.zoom = 12;
  }
  @Input()
  imageData;
}

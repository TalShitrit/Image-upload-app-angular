import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 31.771959;
  lng = 35.217018;
  zoom = 15
  address: string;

  mapcoords = { lat: this.lat, lng: this.lng }
  constructor(public imgService: ImageService) { }
  map
  ngOnInit(): void {
    this.map = document.getElementById("map")
    this.setCurrentLocation()
  }
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.imgService.setMap({ "lat": this.lat, "lng": this.lng });
      });
    }
  }
  markerDragEnd($event: any) {
    this.lat = $event.latLng.lat();
    this.lng = $event.latLng.lng();
    this.imgService.setMap({ "lat": this.lat, "lng": this.lng });
  }

}

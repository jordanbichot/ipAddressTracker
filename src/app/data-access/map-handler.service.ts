import { Injectable } from '@angular/core';
import { Icon, LatLngExpression, Map, marker, tileLayer } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapHandlerService {
  public myMap?: Map;
  public initialCoordenates: LatLngExpression = [40, -2];
  public intialZoom = 16;
  public maxZoom = 20;
  private myIcon = new Icon({
    iconUrl: '../../assets/images/icon-location.svg',
    iconSize: [46, 56],
  });

  public CreateMap() {
    this.myMap = new Map('map').setView(
      this.initialCoordenates,
      this.intialZoom
    );

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: this.maxZoom,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.myMap);

    marker(this.initialCoordenates, { icon: this.myIcon }).addTo(this.myMap);
  }

  public setMapViewToCoordenates(
    latitude: number,
    longitude: number,
    zoom = 16
  ) {
    if (this.myMap) {
      this.myMap!.setView([latitude, longitude], zoom);
      marker([latitude, longitude], { icon: this.myIcon }).addTo(this.myMap!);
    }
  }
}

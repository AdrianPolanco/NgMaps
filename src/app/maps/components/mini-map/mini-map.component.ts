import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, LngLatLike, Map } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat!: LngLatLike;
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    if (!this.lngLat) throw 'La propiedad lngLat es requerida';

    new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
  }
}

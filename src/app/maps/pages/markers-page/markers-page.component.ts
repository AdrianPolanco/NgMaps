import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { MarkerAndColor } from '../../interfaces/marker-colors.interface';
import { PlainMarker } from '../../interfaces/plain-marker.interface';

@Component({
  selector: 'maps-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  map?: Map;
  zoom: number = 10;
  lngLat: LngLat = new LngLat(-69.9050165854334, 18.479212433539544);
  markersAndColors: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    // const marker: Marker = new Marker({draggable: true}).setLngLat(this.lngLat).addTo(this.map);

    this.readFromLocalStorage();
  }

  createMarker(): void {
    if(!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;

    const marker: Marker = new Marker({ draggable: true, color }).setLngLat(lngLat).addTo(this.map);

    this.markersAndColors.push({ marker, color });
    this.saveToLocalStorage();
    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker(index: number): void {
    if (!this.map) return;

    //Eliminando el marcador del mapa
    this.markersAndColors[index].marker.remove();
    //Eliminando el marcador del arreglo
    this.markersAndColors.splice(index, 1);
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage(): void {
    const plainMarkers: PlainMarker[] = this.markersAndColors.map((markerAndColor) => {
      const { color, marker } = markerAndColor;
      const { lng, lat } = marker.getLngLat();
      const lngLat =  [lng, lat]
      return {color, lngLat};
    })

    localStorage.setItem('markers', JSON.stringify(plainMarkers));
   }

  readFromLocalStorage(): void {
    if(!this.map) return;
    const plainMarkers: PlainMarker[] = JSON.parse(localStorage.getItem('markers') || '[]');
    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const newData: LngLat = new LngLat(lng, lat);
      this.addMarker(newData, color);
    });
  }
}

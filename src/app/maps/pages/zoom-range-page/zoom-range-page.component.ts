import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl';

@Component({
  selector: 'maps-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;
  @ViewChild('zoomInput') zoomInput?: ElementRef;
  map?: Map;
  zoom: number = 10;
  lngLat: LngLat = new LngLat(-69.9050165854334, 18.479212433539544);
  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  mapListeners() {
    if (!this.map) throw 'El elemento HTML no fue encontrado';
    const zoom = this.map!.getZoom();
    this.map?.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map?.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 1) {
        this.map!.zoomTo(1);
        return;
      }
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.lngLat = this.map!.getCenter();
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(zoom: string) {
    const normalizedZoom = Number(zoom);
    if (isNaN(normalizedZoom)) return;
    if (normalizedZoom > 18 || normalizedZoom < 1) return;
    this.map?.zoomTo(normalizedZoom);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}

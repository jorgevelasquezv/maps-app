import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PlaneMarker {
  lngLat: LngLat;
  color: string;
}

@Component({
  selector: 'maps-marker-page',
  templateUrl: './marker-page.component.html',
  styleUrl: './marker-page.component.css',
})
export class MarkerPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 10;

  public map?: Map;

  public lngLat: LngLat = new LngLat(-76.1450087936198, 4.417366578180861);

  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('Map not found');
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: this.zoom,
    });

    new Marker({
      color: 'purple',
    })
      .setLngLat(this.lngLat)
      .addTo(this.map);

    this.loadFromLocalStorage();
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }

  public createMarker(): void {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 8 + 8) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  public addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;
    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);
    this.markers.push({ marker, color });
    this.saveToLocalStorage();
    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  public removeMarker(index: number): void {
    if (!this.map) return;
    const marker = this.markers[index];
    marker.marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }

  public flyToMarker(marker: Marker): void {
    if (!this.map) return;
    this.map.flyTo({
      center: marker.getLngLat(),
      zoom: 15,
    });
  }

  public saveToLocalStorage(): void {
    if (!this.map) return;
    const plainMarkers: PlaneMarker[] = this.markers.map(({marker, color}) => ({
      lngLat: marker.getLngLat(),
      color,
    }));
    localStorage.setItem('markers', JSON.stringify(plainMarkers));
  }

  public loadFromLocalStorage(): void {
    if (!this.map) return;
    const markers = localStorage.getItem('markers');
    if (!markers) return;
    const parsedMarkers: PlaneMarker[] = JSON.parse(markers);
    parsedMarkers.forEach((marker: PlaneMarker) => {
      this.addMarker(marker.lngLat, marker.color);
    });
  }
}

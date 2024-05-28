import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit, OnDestroy {

  @Input()
  public lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;

  public zoom: number = 15;

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('Map not found');
    if (!this.lngLat) throw new Error('LngLat not found');
    const [lng, lat] = this.lngLat;
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: new LngLat(lng, lat),
      zoom: this.zoom,
      interactive: false,
    });

    new Marker({
      color: 'purple',
    })
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}

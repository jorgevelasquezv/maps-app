import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'maps-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;

  public lngLat: LngLat = new LngLat(-76.1450087936198, 4.417366578180861);

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('Map not found');
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 9,
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}

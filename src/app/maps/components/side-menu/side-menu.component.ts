import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { name: 'Fullscreen', route: '/maps/fullscreen' },
    { name: 'Zoom Range', route: '/maps/zoom-range' },
    { name: 'Marker', route: '/maps/marker' },
    { name: 'Properties', route: '/maps/properties' },
  ];

  constructor() {}
}

import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: "./side-menu.component.css"
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [
    { name: "Full Screen", route: "/maps/fullscreen" },
    { name: "Zoom Range", route: "/maps/zoom-range" },
    { name: "Houses", route: "/maps/properties" },
    { name: "Markers", route: "/maps/markers" }
  ]
}

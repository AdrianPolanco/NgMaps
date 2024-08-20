import { Component } from '@angular/core';
import { House, houses } from '../../interfaces/house.interface';

@Component({
  selector: 'maps-properties-page',
  templateUrl: './properties-page.component.html',
  styles: ``
})
export class PropertiesPageComponent {
  houses: House[] = houses
}

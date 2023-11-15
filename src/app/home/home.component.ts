import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../models/housinglocation';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  filteredLocationList: Housinglocation[] = [];
  housingLocationList: Housinglocation[] = [];
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  hosingService: HousingService = inject(HousingService);
  constructor() {
    this.hosingService
      .getAllHousingLocations()
      .then((housingLocationList: Housinglocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }

  filterResult(arg0: string) {
    if (!arg0) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter((location) =>
      location?.city.toLowerCase().includes(arg0.toLowerCase())
    );
  }
}

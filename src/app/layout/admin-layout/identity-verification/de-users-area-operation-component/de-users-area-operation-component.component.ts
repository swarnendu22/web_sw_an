import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Map {
  lat: number;
  lng: number;
}



@Component({
  selector: 'app-de-users-area-operation-component',
  templateUrl: './de-users-area-operation-component.component.html',
  styleUrls: ['./de-users-area-operation-component.component.css']
})
export class DeUsersAreaOperationComponent implements OnInit {


  map: Map = { lat: 22.5392287, lng: 88.3595163 };
  address = null;
  country = null;
  // tslint:disable-next-line: variable-name
  buffer_size = null;
  constructor(public dialogRef: MatDialogRef<DeUsersAreaOperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  markerDragEnd(map, event) {
    this.map.lat = event.coords.lat;
    this.map.lng = event.coords.lng;
    this.getPlacesfromCoordinate();
  }
  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.lat = position.coords.latitude;
        this.map.lng = position.coords.longitude;
        this.getPlacesfromCoordinate();
      });
    }
  }
  getPlacesfromCoordinate() {
    // tslint:disable-next-line: new-parens
    let geocoder = new google.maps.Geocoder;
    let latlng = { lat: this.map.lat, lng: this.map.lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.address = `${result.formatted_address}`;
  }

  onLocationSelected(location: Location) {
    this.map.lat = location.latitude;
    this.map.lng = location.longitude;
  }

  onSave() {
    this.dialogRef.close({
      'id': this.data.id,
      'lat': this.map.lat,
      'lng': this.map.lng,
      'max_buffer_distance': this.buffer_size,
      'status': this.data.status
    });
  }
}

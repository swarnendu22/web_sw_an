import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getCity, getArea, getState, getZipCode, getCountry, getStateShort } from '../../../../../utils/geolocation';

export interface Map {
  lat: number,
  lng: number
}



@Component({
  selector: 'app-dialog-lat-long',
  templateUrl: './dialog-lat-long.component.html',
  styleUrls: ['./dialog-lat-long.component.css']
})
export class DialogLatLongComponent implements OnInit {
  map: Map = { lat: 22.5392287, lng: 88.3595163 };
  address = null
  vicinity = null
  address_components = null
  zoom: number = 18;
  constructor(public dialogRef: MatDialogRef<DialogLatLongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.map.lat = this.data && this.data.lat ? this.data.lat : this.map.lat;
    this.map.lng = this.data && this.data.lng ? this.data.lng : this.map.lng;
    this.address = this.data && this.data.address ? this.data.address : this.address
  }
  ngOnInit() {
  }

  markerDragEnd(map, event) {
    this.map.lat = event.coords.lat;
    this.map.lng = event.coords.lng;
    this.getPlacesfromCoordinate()
  }
  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.lat = position.coords.latitude;
        this.map.lng = position.coords.longitude;
        this.getPlacesfromCoordinate()
      });
    }
  }
  getPlacesfromCoordinate() {
    var geocoder = new google.maps.Geocoder;
    var latlng = { lat: this.map.lat, lng: this.map.lng };
    geocoder.geocode({ 'location': latlng }, (results:any, status) => {
      if (status === 'OK') {
        if (results[0]) {
          let addressArray = results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state = getState(addressArray),
          zipCode = getZipCode(addressArray),
          country = getCountry(addressArray),
          regionCode = getStateShort(addressArray)
          this.address = results[0].formatted_address
          this.vicinity = results[0].vicinity
          this.address_components = {
            city, area, state, zipCode, country, regionCode
          }
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log(result)
    console.log(result.vicinity)
    let addressArray = result.address_components,
      city = getCity(addressArray),
      area = getArea(addressArray),
      state = getState(addressArray),
      zipCode = getZipCode(addressArray),
      country = getCountry(addressArray),
      regionCode = getStateShort(addressArray)
      this.address = result.formatted_address
      this.vicinity = result.vicinity
      this.address_components = {
      city, area, state, zipCode, country, regionCode
    }
  }

  onLocationSelected(location: Location) {
    this.map.lat = location.latitude;
    this.map.lng = location.longitude;
  }
  onSave() {
    console.log(this.address_components)
    this.dialogRef.close({
      lat: this.map.lat,
      lng: this.map.lng,
      address: this.address,
      address_components: this.address_components,
      vicinity: this.vicinity ? this.vicinity :  this.address
    })
  }
}

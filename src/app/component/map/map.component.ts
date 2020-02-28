import { Component, OnInit, NgZone, ViewChild, EventEmitter, Output } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { MapData } from "../../dto/Mapdto";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('txtHome')
  public searchElementRef;

  @Output() newItemEvent = new EventEmitter<MapData>();


  constructor(public navCtrl: NavController, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();


  }


  ngOnInit() {

    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();


    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let nativeHomeInputBox = document.getElementById('txtHome');
      console.log(nativeHomeInputBox);
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox as HTMLInputElement, {
        types: ['address']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

        });
      });

    });
  }



  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        console.log(position);
      });
    }
  }

  submit(value: string) {
    console.log(value);
    let obj = new MapData(this.latitude, this.longitude, value);
    this.newItemEvent.emit(obj);
  }

  cancel() {
    //
  }

}

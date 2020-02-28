import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';
import { MapData } from 'src/app/dto/Mapdto';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.page.html',
  styleUrls: ['./make-request.page.scss'],
})
export class MakeRequestPage implements OnInit {

  day: any;
  cargoType; any;

  startLocation: MapData;
  endLocation: MapData;

  startLocationaddress: any;
  endLocationaddress: any;

  driverForm: FormGroup;
  submitted = false;
  //locations

  submitingData: any;
  user: any;


  map1 = false;
  map2 = false;
  button1 = "set";
  button2 = "set";

  constructor(private fb: FormBuilder, private auth: AuthService, private reqser: RequestService, private navCtrl: NavController) {
    this.user = this.auth.getUser();
  }

  ngOnInit() {


    this.driverForm = this.fb.group({
      weight: ['', Validators.required],
      volume: ['', Validators.required],
      type: ['', Validators.required]
    });
  }



  get driverFormControl() {
    return this.driverForm.controls;
  }

  fillValue1(value) {
    this.map1 = false;
    this.button1 = "set";
    this.startLocation = value;
    this.startLocationaddress = value.address;
  }
  fillValue2(value) {
    this.map2 = false;
    this.button2 = "set";
    this.endLocation = value;
    this.endLocationaddress = value.address;
  }
  setMap1() {
    if (this.map1 == false) {
      this.button1 = "close";
      this.map1 = true;
    } else {
      this.button1 = "set";
      this.map1 = false;
    }
  }
  setMap2() {
    if (this.map2 == false) {
      this.button2 = "close";
      this.map2 = true;
    } else {
      this.button2 = "set";
      this.map2 = false;
    }
  }
  async onSubmit() {

    this.submitted = true;
    let requstObject = {

      user_id: this.user._id,
      cargo_type: this.driverForm.value.type + " " + this.cargoType,
      volume: this.driverForm.value.volume,
      weight: this.driverForm.value.weight,
      due_time: this.day,
      user_location: { lat: this.startLocation.latitude, lon: this.startLocation.longitude },
      destination: { lat: this.endLocation.latitude, lon: this.endLocation.longitude }

    };
    if (this.driverForm.valid) {
      alert('Form Submitted succesfully!!');
      await this.reqser.makeRequest(requstObject).subscribe(res => {
        if (res.success == false) {
          alert('Request Submission Failed!!!\n try again..');
        }

      }, err => {
        console.log(err);
      });

      this.navCtrl.navigateBack('/profile');
    }
  }
  segmentChanged(ev: any) {
    this.cargoType = ev.detail.value;
    console.log('Segment changed', ev.detail.value);

  }
  Cancel() {
    this.navCtrl.navigateBack('/profile');
  }
}

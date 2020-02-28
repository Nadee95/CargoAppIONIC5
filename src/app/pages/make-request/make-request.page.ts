import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.page.html',
  styleUrls: ['./make-request.page.scss'],
})
export class MakeRequestPage implements OnInit {

  startLocation: any;
  endLocation: any;


  //locations

  submitingData: any;


  map1 = false;
  map2 = false;
  button1 = "set";
  button2 = "set";
  constructor() { }

  ngOnInit() {
  }

  fillValue1(value) {
    this.map1 = false;
    this.startLocation = value.address;
  }
  fillValue2(value) {
    this.map2 = false;
    this.endLocation = value.address;
  }
  setMap1() {
    if (this.map1 == false) {
      this.button1 = "set";
      this.map1 = true;
    } else {
      this.button1 = "close";
      this.map1 = false;
    }
  }
  setMap2() {
    if (this.map2 == false) {
      this.button2 = "set";
      this.map2 = true;
    } else {
      this.button2 = "close";
      this.map2 = false;
    }
  }
}

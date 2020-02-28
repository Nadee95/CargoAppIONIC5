import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DriverService } from 'src/app/services/driver.service';


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.page.html',
  styleUrls: ['./add-driver.page.scss'],
})
export class AddDriverPage implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  user: any;
  constructor(private auth: AuthService, private driverService: DriverService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.user = this.auth.getUser();

    this.registerForm = this.fb.group({
      licence_no: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(8)]],
      age: ['', [Validators.required, Validators.maxLength(2)]],
    });
  }

  registerAsDrver() {
    this.driverService.addDriver({ _id: this.user._id, age: this.registerForm.value.age, licence_no: this.registerForm.value.licence_no })
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }

}

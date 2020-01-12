import { Component, OnInit, NgZone } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { RegisterService } from "../../services/register.service";
import { MustMatch } from "../../services/must-match";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { SignupDTO } from "src/app/dto/SignupDTO";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  userDto: FormGroup;
  phoneIndex = 0;
  user: SignupDTO;
  submitted = false;
  constructor(
    private router: Router,
    private alertController: AlertController,
    public fb: FormBuilder,
    private zone: NgZone,
    private registerService: RegisterService
  ) {
    this.userDto = fb.group(
      {
        email: new FormControl("email", [
          Validators.required,
          Validators.minLength(6),
          Validators.email
        ]),
        username: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]),
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]),
        phone: this.fb.array([this.fb.group({ phone: "" })]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50)
        ]),
        confirmPassword: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50)
        ])
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  ngOnInit() {}

  register() {
    this.user = new SignupDTO(
      this.userDto.value.name,
      this.userDto.value.username,
      this.userDto.value.email,
      this.userDto.value.phone,
      this.userDto.value.password
    );
    this.submitted = true;
    this.registerService.register(this.user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(["/login"]);
      },
      error => {
        console.log(error);
        this.presentAlert(error);
      }
    );
    //alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.userDto.value));
  }

  get f() {
    return this.userDto.controls;
  }

  get phones() {
    return this.userDto.get("phone") as FormArray;
  }

  addPhone() {
    this.phoneIndex++;
    this.phones.push(this.fb.group({ phone: "" }));
  }
  deletePhone(index) {
    this.phoneIndex--;
    this.phones.removeAt(index);
  }

  async presentAlert(res) {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: res.status + " " + res.statusText,
      message: res.error,
      buttons: ["OK"]
    });
    await alert.present();
  }
}

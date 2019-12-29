import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  NgForm,
  FormControl,
  Validators
} from "@angular/forms";
import { LoginService } from "../../services/login.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  form: FormGroup;
  // @ViewChild('form') form:NgForm;

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  constructor(
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginService,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.form = this.fb.group({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6)
      ])
    });
  }

  onFormSubmit(): void {
    this.loginService.login(this.form.value).subscribe(
      res => {
        this.zone.run(() => {
          //this.form.reset();
        });
      },
      error => {
        this.presentAlert(error);
      }
    );
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

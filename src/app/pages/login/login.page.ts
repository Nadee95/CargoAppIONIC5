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
import { AuthService } from "src/app/services/auth.service";
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
    private zone: NgZone,
    private auth: AuthService
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

  // onFormSubmit() {
  //   this.loginService.login(this.form.value).subscribe(
  //     res => {
  //       this.zone.run(() => {
  //         this.form.reset();
  //         this.router.navigate(["/profile"]); //can add query params
  //       });
  //     },
  //     error => {
  //       this.presentAlert(error);
  //     }
  //   );
  // }

  async onFormSubmit() {
    (await this.auth.login(this.form.value)).subscribe(
      res => {
        //console.log(res);
        this.zone.run(() => {
          this.form.reset();
          this.router.navigate(["/profile"]); //can add query params
        });
      },
      error => {
        this.presentAlert(error);
        console.log(error);
      }
    );
  }
  /////////////////////////
  // login() {
  //   this.auth.login(this.form.value).subscribe(async res => {
  //     if (res) {
  //       this.router.navigateByUrl('/members');
  //     } else {
  //       const alert = await this.alertController.create({
  //         header: 'Login Failed',
  //         message: 'Wrong credentials.',
  //         buttons: ['OK']
  //       });
  //       await alert.present();
  //     }
  //   });
  // }

  //////////////////////////////
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

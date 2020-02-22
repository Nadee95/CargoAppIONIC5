import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  user = null;

  constructor(private auth: AuthService) { }

  ionViewWillEnter() {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() { }

  go() {
    //
  }
}

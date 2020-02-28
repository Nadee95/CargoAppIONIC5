import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.page.html',
  styleUrls: ['./upload-modal.page.scss'],
})
export class UploadModalPage implements OnInit {

  @Input() data: any;


  constructor(public navCtrl: NavController, private navParams: NavParams,
    private modalCtrl: ModalController, private profileService: ProfileService) {
    this.data = this.navParams.get('img');
  }

  ngOnInit() {
  }

  saveImage() {
    this.profileService.uploadImageUsingBrowser(this.data).then(res => {
      this.modalCtrl.dismiss({ reload: true });
    }, err => {
      this.dismiss();
    });
  }
  uploadFromBrowser(event) {
    this.data = event.target.files[0];
    console.log(event.target.files[0]);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}

import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UploadModalPage } from '../upload-modal/upload-modal.page';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  user = null;

  image: any;
  constructor(private auth: AuthService, public navCtrl: NavController, private profileService: ProfileService,
    private camera: Camera, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {
    this.reloadImages();
    //this.navCtrl.pa

  }

  ionViewWillEnter() {


  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  reloadImages() {
    this.profileService.getImage().subscribe(data => {

      this.user = this.auth.getUser();
      this.image = data;
    });
  }

  deleteImage(img) {
    this.profileService.deleteImage(img).subscribe(data => {
      this.reloadImages();
    });
  }

  async openImage(img) {
    // let modal = this.modalCtrl.create('PreviewModalPage', { 'img': img });
    let modal = this.modalCtrl.create({ component: 'EditProfilePage', componentProps: { img: this.image } });
    (await modal).present();
  }

  async presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },

        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    (await actionSheet).present();
  }

  async takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then(async (imagePath) => {

      let modal = await this.modalCtrl.create({ component: UploadModalPage });

      await modal.present();

      modal.onDidDismiss().then((data) => {
        if (data) {
          this.reloadImages();
        }
      });

    }, (err) => {
      console.log('Error: ', err);
    });

  }
  async  toUploadPage() {
    let modal = await this.modalCtrl.create({ component: UploadModalPage, componentProps: { img: this.image } });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data) {
        this.reloadImages();
      }
    });


  }
}

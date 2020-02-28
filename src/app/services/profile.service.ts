import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = "http://localhost:3000/users/dpImage/";

  id: null;

  constructor(public http: HttpClient, private transfer: FileTransfer, private auth: AuthService) {
    this.id = this.auth.getUser()._id;
  }
  // getImage() {
  //   return this.http.get(this.apiUrl + this.id).pipe(map((res: any) => res.json()));
  // }
  getImage() {
    return this.http.get(this.apiUrl + "uri/" + this.id, { responseType: 'text' });
  }
  deleteImage(img) {
    return this.http.delete(this.apiUrl + this.id);
  }
  async uploadImageUsingBrowser(img) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'multipart/form-data');
    console.log(img.filename = img.name)
    const uploadData = new FormData();
    uploadData.append('image', img);
    uploadData.append('_Id', this.id);

    console.log(img.name, this.id);
    await this.http.post(this.apiUrl + "frombrowser", uploadData, {
      headers: {

        "Content-Type": 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
      }
    })
      .subscribe(data => {
        console.log(data);
      });


  }
  uploadImage(img) {

    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { '_Id': this.id }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, this.apiUrl, options);

  }

}

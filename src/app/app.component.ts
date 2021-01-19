import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from "@ionic-native/camera";

import { HomePage } from '../pages/home/home';
import { Chooser } from '@ionic-native/chooser';
import { LoadingController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  imageData: any;
  image: any;
  imageError:any;
  size: any;
  file: any;
  mimeType:any;
  fileUri: any;
  fileSize: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private camera: Camera, private chooser: Chooser, private loadingCtrl:LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log("device ready");
    });
  }

  takepicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      // targetHeight:100,
      // targetWidth:100
    }
    this.startCamera(options);
  }
  pickpicture() {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetHeight:100,
      targetWidth:100
    }
    this.startCamera(options);
  }

  startCamera(options) {
    console.log("inside get picture");
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;

      const t = atob(imageData);
      this.size = 4 * Math.ceil(t.length / 3);

      console.log("get picture response : ",imageData);

    }, (err) => {
      this.imageError = "get picture error " + err;
      console.log("get picture error : ", err);
    });
  }

  chooseFile() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.chooser.getFile("").then(
      file=>{
        console.log("choose file response data URI : ", file.dataURI);
        console.log("choose file response DATA : ", file.data);

        this.file = file.mediaType;
        this.fileUri = file.uri;

        loading.dismiss();
      },
      err=>{
        loading.dismiss();
        console.log("choose file error : ", err);
      }
    )
  }
}

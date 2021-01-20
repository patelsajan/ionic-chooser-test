import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from "@ionic-native/camera";

import { HomePage } from '../pages/home/home';
import { Chooser } from '@ionic-native/chooser';
import { LoadingController } from 'ionic-angular';
import { File } from "@ionic-native/file";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  imageData: any;
  image: any;
  imageError: any;
  size: any;
  file: any;
  fileUri: any;
  fileSize: any;
  base64string:any;

  fileSizeInputTag:any;
  fileTypeInputTag: any;
  fileBase64StringInputTag: any;
  fileNameInputTag : any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private camera: Camera,
    private chooser: Chooser, private loadingCtrl: LoadingController, private filePlugin: File) {
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
      // targetHeight: 100,
      // targetWidth: 100
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

      console.log("get picture response : ", imageData);

    }, (err) => {
      this.imageError = "get picture error " + err;
      console.log("get picture error : ", err);
    });
  }

  chooseFile() {
    this.chooser.getFile("").then(
      file => {
        console.log("choose file response data URI : ", file.dataURI);
        console.log("choose file response DATA : ", file.data);

        this.file = file.mediaType;
        this.fileUri = file.uri;
        this.base64string = file.dataURI;

      },
      err => {
        console.log("choose file error : ", err);
      }
    );
  }

  fileSelect(event: any) {
    console.log("fileselect : ", event);
    let file = event.target.files[0];

    this.fileSizeInputTag = file.size;
    this.fileTypeInputTag = file.type;
    this.fileNameInputTag = file.name;



    //fileReader api.
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      console.log("file reader response", reader);
      console.log("fileselect file access: ", reader.result);

      this.fileBase64StringInputTag = reader.result;

    }
  }
}

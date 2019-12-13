import { ImageUtilService } from './../../services/image-util.service';
import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage 
{
  clienteDto : ClienteDTO;
  pictureString : string;
  isCameraOn : boolean = false;
  profileImage;

  constructor (public navCtrl: NavController, 
               public navParams: NavParams, 
               public storageService: StorageService,
               public clienteService: ClienteService,
               public camera: Camera,
               public imageUtilService : ImageUtilService, 
               public domSanitizer : DomSanitizer) 
  {
    this.profileImage = "assets/imgs/avatar-blank.png";
  }

  ionViewDidLoad () 
  {
    this.loadData ();
  }

  loadData ()
  {
    let localUser = this.storageService.getLocalUser ();
    if (localUser && localUser.email)
    {
      this.clienteService.findByEmail (localUser.email).subscribe (
        response =>
        {
          // casting
          this.clienteDto = response as ClienteDTO;
          this.getImageIfExists ();
        },
        error => 
        {
          if (error.status == 403)
          {
            this.navCtrl.setRoot ('HomePage');
          }
        }
      )
    }
    else 
    {
      this.navCtrl.setRoot ('HomePage');
    }
  }

  getImageIfExists ()
  {
    this.clienteService.getImageFromBucket (this.clienteDto.id).subscribe (
      response =>
      {
        this.clienteDto.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.clienteDto.id}.jpg`;
        this.imageUtilService.blobToDataURI (response).then (dataURL =>
        {
          let str : string = dataURL as string;
          this.profileImage = this.domSanitizer.bypassSecurityTrustUrl (str);
        });
      },
      error => 
      {
        this.profileImage = "assets/imgs/avatar-blank.png";
      }
    )
  }

  getCameraPicture ()
  {
    this.isCameraOn = true;

    // Parametros default
    const options : CameraOptions = 
    {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture (options).then ((imageData) =>
    {
      this.pictureString = `data:image/png;base64,${imageData}`;
      this.isCameraOn = false;
    }, 
    (error) => 
    { 
      this.isCameraOn = false;
    });
  }

  getGalleryPicture ()
  {
    this.isCameraOn = true;

    // Parametros default
    const options : CameraOptions = 
    {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture (options).then ((imageData) =>
    {
      this.pictureString = `data:image/png;base64,${imageData}`;
      this.isCameraOn = false;
    }, 
    (error) => 
    { 
      this.isCameraOn = false;
    });
  }

  sendPicture ()
  {
    this.clienteService.uploadPicture (this.pictureString).subscribe (
      response => 
      {
        this.pictureString = null;
        this.getImageIfExists ();
      },
      error => {}
    )
  }

  cancelPicture ()
  {
    this.pictureString = null;
  }
}
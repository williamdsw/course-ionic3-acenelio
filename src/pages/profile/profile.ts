import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage 
{
  clienteDto : ClienteDTO;

  constructor (public navCtrl: NavController, 
               public navParams: NavParams, 
               public storageService: StorageService,
               public clienteService: ClienteService) 
  {}

  ionViewDidLoad () 
  {
    let localUser = this.storageService.getLocalUser ();
    if (localUser && localUser.email)
    {
      this.clienteService.findByEmail (localUser.email).subscribe (
        response =>
        {
          this.clienteDto = response;
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
      },
      error => {}
    )
  }
}
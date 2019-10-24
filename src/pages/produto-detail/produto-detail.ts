import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage 
{
  item : ProdutoDTO;

  constructor (public navCtrl: NavController, 
               public navParams: NavParams,
               public produtoService : ProdutoService) 
  {}

  ionViewDidLoad () 
  {
    let produtoID = this.navParams.get ("produtoID");
    this.produtoService.findByID (produtoID).subscribe (
      response =>
      {
        this.item = response;
        this.getImageUrlIfExists ();
      },
      error => {});
  }

  getImageUrlIfExists ()
  {
    this.produtoService.getImageFromBucket (this.item.id).subscribe (
      response =>
      {
        this.item.imageURL = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {})
  }
}
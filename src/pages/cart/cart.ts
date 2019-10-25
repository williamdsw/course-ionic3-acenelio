import { ProdutoDTO } from './../../models/produto.dto';
import { CartService } from './../../services/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, CardTitle } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage 
{
  items : CartItem[];

  constructor (public navCtrl: NavController, 
               public navParams: NavParams, 
               public cartService : CartService,
               public produtoService : ProdutoService) 
  {}

  ionViewDidLoad () 
  {
    let cart = this.cartService.getCart ();
    this.items = cart.items;
    this.loadImageUrls ();
  }

  // Carrega thumbnails dos itens
  loadImageUrls ()
  {
    this.items.forEach (item =>
    {
      this.produtoService.getSmallImageFromBucket (item.produto.id).subscribe (
        response =>
        {
          item.produto.imageURL = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {})
    });
  }

  removeItem (produtoDto : ProdutoDTO)
  {
    this.items = this.cartService.removeProduto (produtoDto).items;
  }

  increaseQuantity (produtoDto : ProdutoDTO)
  {
    this.items = this.cartService.increaseQuantity (produtoDto).items;
  }

  decreaseQuantity (produtoDto : ProdutoDTO)
  {
    this.items = this.cartService.decreaseQuantity (produtoDto).items;
  }

  getTotal () : number
  {
    return this.cartService.getTotal ();
  }

  goOn ()
  {
    this.navCtrl.setRoot ("CategoriasPage");
  }
}
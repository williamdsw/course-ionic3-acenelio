import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage 
{
  items : ProdutoDTO[];

  constructor (public navCtrl: NavController, 
               public navParams: NavParams,
               public produtoService : ProdutoService, 
               public loadingController : LoadingController) 
  {}

  ionViewDidLoad () 
  {
    this.loadData ();
  }

  private loadData () 
  {
    let loader = this.presentLoading();

    // Recuperando parametro da navegacao
    let categoriaID = this.navParams.get ("categoriaID");
    this.produtoService.findByCategoria (categoriaID).subscribe (
      response => 
      {
        loader.dismiss();
        // Recuperando atributo da reposta
        this.items = response["content"];
        this.loadImageURLs();
      }, 
      error => { loader.dismiss(); });
  }

  // Carrega URLs das imagens
  loadImageURLs ()
  {
    this.items.forEach (item =>
    {
      this.produtoService.getSmallImageFromBucket (item.id).subscribe (
      response => 
      {
        item.imageURL = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {});
    });
  }

  // Empilha pagina de detalhes
  showDetail (prodID : string)
  {
    this.navCtrl.push ("ProdutoDetailPage", {produtoID : prodID});
  }

  presentLoading ()
  {
    let loader = this.loadingController.create ({ content: "Aguarde..." });
    loader.present ();
    return loader;
  }

  doRefresher (refresher)
  {
    this.loadData ();
    setTimeout (() => { refresher.complete (); }, 1000);
  }
}
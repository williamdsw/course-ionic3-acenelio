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
  items : ProdutoDTO[] = [];
  page : number = 0;
  linesPerPage : number = 10;


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
    this.produtoService.findByCategoria (categoriaID, this.page, this.linesPerPage).subscribe (
      response => 
      {
        loader.dismiss();

        // Recuperando atributo da reposta
        let startLength = this.items.length;
        this.items = this.items.concat (response["content"]);
        let endLength = this.items.length - 1;
        this.loadImageURLs(startLength, endLength);
      }, 
      error => { loader.dismiss(); });
  }

  // Carrega URLs das imagens
  loadImageURLs (startIndex : number, endIndex : number)
  {
    for (let index = startIndex; index <= endIndex; index++) 
    {
      const item = this.items[index];
      this.produtoService.getSmallImageFromBucket (item.id).subscribe (
        response => 
        {
          item.imageURL = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
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
    this.items = [];
    this.page = 0;
    this.loadData ();
    setTimeout (() => { refresher.complete (); }, 1000);
  }

  doInfinite (infiniteScroll)    
  {
    this.page++;
    this.loadData ();
    setTimeout (() => { infiniteScroll.complete (); }, 1000);
  }
}
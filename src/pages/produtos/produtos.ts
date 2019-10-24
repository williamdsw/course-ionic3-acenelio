import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
               public produtoService : ProdutoService) 
  {}

  ionViewDidLoad () 
  {
    // Recuperando parametro da navegacao
    let categoriaID = this.navParams.get ("categoriaID");
    this.produtoService.findByCategoria (categoriaID).subscribe (
      response => 
      { 
        // Recuperando atributo da reposta
        this.items = response["content"];
      },
      error => {}
    )
  }
}
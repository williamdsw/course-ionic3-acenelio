import { API_CONFIG } from './../../config/api.config';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage 
{
  items : CategoriaDTO[];
  bucketUrl : string = API_CONFIG.bucketBaseUrl;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               public categoriaService: CategoriaService) { }

  ionViewDidLoad () 
  {
    console.log ('ionViewDidLoad CategoriasPage');

    // Chamando funcao do servico injetado
    this.categoriaService.findAll ().subscribe (
      response => 
      {
        this.items = response;
      },
      error => {});
  }

  showProdutos ()
  {
    this.navCtrl.push ("ProdutosPage");
  }
}
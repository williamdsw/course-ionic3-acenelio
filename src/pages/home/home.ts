import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  // Instancia de um DTO vazio
  credenciaisDto : CredenciaisDTO = 
  {
    email: "",
    senha: ""
  };

  // Injetando objeto no construtor da classe
  constructor (public navCtrl: NavController, public menuControler: MenuController) 
  {

  }

  // Declaracao de metodo public
  public login () 
  {
    console.log (this.credenciaisDto);

    // Todo elemento tem que ser acessado pelo 'this'
    this.navCtrl.setRoot ('CategoriasPage');
  }

  // Quando a pagina entrar
  ionViewWillEnter () 
  {
    this.menuControler.swipeEnable (false);
  }

  // Quando a pagina sair
  ionViewDidLeave () 
  {
    this.menuControler.swipeEnable (true);
  }
}
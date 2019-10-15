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
  // Injetando objeto no construtor da classe
  constructor (public navCtrl: NavController, public menuControler : MenuController) 
  {

  }

  // Declaracao de metodo public
  public login ()
  {
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
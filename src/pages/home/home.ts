import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  constructor (public navCtrl: NavController) 
  {

  }

  // Declaracao de metodo public
  public login ()
  {
    // Todo elemento tem que ser acessado pelo 'this'
    this.navCtrl.setRoot ('CategoriasPage');
  }
}
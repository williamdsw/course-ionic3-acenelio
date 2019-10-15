import { AuthService } from './../../services/auth.service';
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
  constructor (public navCtrl: NavController, 
               public menuControler: MenuController, 
               public authService : AuthService) 
  {}

  // Declaracao de metodo public
  public login () 
  {
    this.authService.authenticate (this.credenciaisDto).subscribe (
      response => 
      {
        let authorization = response.headers.get ("Authorization");
        this.authService.successfulLogin (authorization);

        // Todo elemento tem que ser acessado pelo 'this'
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => { }
    )
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
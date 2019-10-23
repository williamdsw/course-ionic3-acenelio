import { ClienteService } from './../../services/domain/cliente.service';
import { CidadeDTO } from './../../models/cidade.dto';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';

@IonicPage ()
@Component ({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage 
{
  formGroup : FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor (public navCtrl: NavController, 
               public navParams: NavParams,
               public formBuilder: FormBuilder,
               public cidadeService: CidadeService, 
               public estadoService: EstadoService,
               public clienteService: ClienteService,
               public alertController: AlertController) 
  {
    // Define campos do binding e tipos de validacoes
    this.formGroup = formBuilder.group (
    {
      nome: ["Joaquim", [Validators.required, Validators.minLength (5), Validators.maxLength (120)] ],
      email: ["joaquim@gmail.com", [Validators.required, Validators.email]],
      tipoCliente: ["1", [Validators.required]],
      cpfOuCnpj: ["45166538005", [Validators.required, Validators.minLength (11), Validators.maxLength (14)]],
      senha: ["123", [Validators.required]],
      logradouro: ["Rua Via", [Validators.required]],
      numero: ["5", [Validators.required]],
      complemento: ["Apto 3", []],
      bairro: ["Copacabana", []],
      cep: ["23065570", [Validators.required]],
      telefone1: ["912345678", [Validators.required]],
      telefone2: ["", []],
      telefone3: ["", []],
      estadoID: [null, [Validators.required]],
      cidadeID: [null, [Validators.required]]
    });
  }

  ionViewDidLoad ()
  {
    // Busca estados
   this.estadoService.findAll ().subscribe (
     response => 
     {
      this.estados = response;
      this.formGroup.controls.estadoID.setValue (this.estados[0].id);
      this.updateCidades ();
     },
     error => {})
  }

  // Insere novo usuario
  signupUser ()
  {
    this.clienteService.insert (this.formGroup.value).subscribe (
      response =>
      {
        this.showInsertOK ();
      },
      error => {})
  }

  // Busca cidades
  updateCidades ()
  {
    let estadoID = this.formGroup.value.estadoID;
    this.cidadeService.findAll (estadoID).subscribe (
      response =>
      {
        this.cidades = response;
        this.formGroup.controls.cidadeID.setValue (null);
      },
      error => {})
  }

  // Mostra modal de sucesso
  showInsertOK ()
  {
    let alert = this.alertController.create 
    ({
      title: "Sucesso",
      message: "Cadastro efetuado com sucesso!",
      enableBackdropDismiss: false,
      buttons: [
      { 
        text: "Ok", 
        handler: () =>
        {
          // Desempilha a pagina
          this.navCtrl.pop ();
        }
      }]
    });

    alert.present ();
  }
}
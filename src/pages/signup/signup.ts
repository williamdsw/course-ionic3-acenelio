import { CidadeDTO } from './../../models/cidade.dto';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
               public estadoService: EstadoService) 
  {
    // Define campos do binding e tipos de validacoes
    this.formGroup = formBuilder.group (
    {
      nome: ["Joaquim", [Validators.required, Validators.minLength (5), Validators.maxLength (120)] ],
      email: ["joaquim@gmail.com", [Validators.required, Validators.email]],
      tipoCliente: ["1", [Validators.required]],
      cpfOuCnpj: ["86224544000152", [Validators.required, Validators.minLength (11), Validators.maxLength (14)]],
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

  signupUser ()
  {
    console.log ("Enviou o form");
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
}
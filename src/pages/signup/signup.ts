import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage ()
@Component ({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage 
{
  formGroup : FormGroup;

  constructor (public navCtrl: NavController, 
               public navParams: NavParams,
               public formBuilder: FormBuilder) 
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

  signupUser ()
  {
    console.log ("Enviou o form");
  }
}
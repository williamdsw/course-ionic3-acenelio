import { FieldMessage } from './../models/field-message';
import { StorageService } from './../services/storage.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { AlertController } from 'ionic-angular';

@Injectable ()
export class ErrorInterceptor implements HttpInterceptor
{
    constructor (public storageService : StorageService, 
                 public alertControler : AlertController)
    {}

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        return next.handle (request)
        .catch ((error, caught) => 
        {
            // Verifica
            let objError = error;
            if (objError.error)
            {
                objError = objError.error;
            }

            if (!objError.status)
            {
                objError = JSON.parse (objError);
            }

            switch (objError.status)
            {
                case 401:
                {
                    this.handle401 ();
                    break;
                }

                case 403:
                {
                    this.handle403 ();
                    break;
                }

                case 404:
                {
                    this.handle404 ();
                    break;
                }

                case 422:
                {
                    this.handle422 (objError);
                    break;
                }

                default: 
                {
                    this.handleDefaultError (objError);
                    break;
                }
            }

            return Observable.throw (objError);
        }) as any;
    }

    handle401 ()
    {
        // Configuracoes do alert
        let alert = this.alertControler.create 
        ({
            title: "Erro 401: Falha de Autenticação",
            message: "Email ou senha incorretos",
            enableBackdropDismiss: false,
            buttons: [{text: "Ok" }]
        })

        // Apresenta
        alert.present ();
    }

    handle403 ()
    {
        this.storageService.setLocalUser (null);
    }

    handle404 ()
    {
        let alert = this.alertControler.create
        ({
            title: "Erro 404: Página não encontrada",
            message: "URL não encontrada",
            enableBackdropDismiss: false,
            buttons: [{text: "Ok"}]
        });

        alert.present ();
    }

    handle422 (objError)
    {
        let alert = this.alertControler.create
        ({
            title: "Erro 422 : Validação",
            message: this.listErrors (objError.errors),
            enableBackdropDismiss: false,
            buttons: [{text: "Ok"}]
        });

        alert.present ();
    }

    handleDefaultError (objError)
    {
        let alert = this.alertControler.create
        ({
            title: `Erro ${objError.status}: ${objError.error}`,
            message: objError.message,
            enableBackdropDismiss: false,
            buttons: [{text: "Ok"}]
        });

        alert.present ();
    }

    listErrors (messages: FieldMessage[]) : string
    {
        let errors = "";
        for (let index = 0; index < messages.length; index++)
        {
            errors += `<p><strong> ${messages[index].fieldName} </strong>: ${messages[index].message}</p>`;
        }
        return errors;
    }
}

export const ErrorInterceptorProvider = 
{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor, 
    multi: true
};
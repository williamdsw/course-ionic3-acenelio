import { StorageService } from './../services/storage.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable ()
export class ErrorInterceptor implements HttpInterceptor
{
    constructor (public storageService : StorageService)
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

            console.log ("Erro interceptado");
            console.log (objError);

            switch (objError.status)
            {
                case 403:
                {
                    this.handle403 ();
                    break;
                }

                default: {}
            }

            return Observable.throw (objError);
        }) as any;
    }

    handle403 ()
    {
        this.storageService.setLocalUser (null);
    }
}

export const ErrorInterceptorProvider = 
{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor, 
    multi: true
};
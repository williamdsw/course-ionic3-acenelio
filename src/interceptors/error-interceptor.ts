import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable ()
export class ErrorInterceptor implements HttpInterceptor
{
    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        console.log ('Passou no interceptor');
        return next.handle (req)
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

            return Observable.throw (objError);
        }) as any;
    }
}

export const ErrorInterceptorProvider = 
{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor, 
    multi: true
};
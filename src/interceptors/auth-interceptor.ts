import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable ()
export class AuthInterceptor implements HttpInterceptor
{
    constructor (public storageService : StorageService)
    {}

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        let localUser = this.storageService.getLocalUser ();
        let baseUrlLength = API_CONFIG.baseUrl.length;
        let requestToAPI = (request.url.substring (0, baseUrlLength) == API_CONFIG.baseUrl);
        
        if (localUser && requestToAPI)
        {
            // Clonando a requisicao original com header adicionado
            let bearer = `Bearer ${localUser.token}`;
            const authRequest = request.clone (
            {
                headers: request.headers.set ('Authorization', bearer)
            });

            return next.handle (authRequest);
        }
        else 
        {
            return next.handle (request);
        }
    }
}

export const AuthInterceptorProvider = 
{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor, 
    multi: true
};
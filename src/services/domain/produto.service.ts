import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable ()
export class ProdutoService
{
    constructor (public httpClient : HttpClient)
    {}

    findByCategoria (categoriaID : string)
    {
        return this.httpClient.get (`${API_CONFIG.baseUrl}/produtos?categorias=${categoriaID}`);
    }

    getSmallImageFromBucket (produtoID : string) : Observable<any>
    {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${produtoID}-small.jpg`;
        return this.httpClient.get (url, { responseType: "blob"});
    }
}
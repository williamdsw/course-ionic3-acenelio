import { ProdutoDTO } from './../../models/produto.dto';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable ()
export class ProdutoService
{
    constructor (public httpClient : HttpClient)
    {}

    findByID (produtoID : string)
    {
        return this.httpClient.get<ProdutoDTO> (`${API_CONFIG.baseUrl}/produtos/${produtoID}`);
    }

    findByCategoria (categoriaID : string)
    {
        return this.httpClient.get (`${API_CONFIG.baseUrl}/produtos?categorias=${categoriaID}`);
    }

    getImageFromBucket (produtoID : string) : Observable<any>
    {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${produtoID}.jpg`;
        return this.httpClient.get (url, {responseType: "blob"});
    }

    getSmallImageFromBucket (produtoID : string) : Observable<any>
    {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${produtoID}-small.jpg`;
        return this.httpClient.get (url, {responseType: "blob"});
    }
}
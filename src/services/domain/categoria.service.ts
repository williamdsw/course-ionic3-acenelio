import { CategoriaDTO } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

// Indica que a classe sera injetada
@Injectable ()
export class CategoriaService 
{
    constructor (public httpClient : HttpClient)
    {}

    // nomeFuncao () : tipo de retorno
    findAll () : Observable<CategoriaDTO[]>
    {
        return this.httpClient.get<CategoriaDTO[]> (`${API_CONFIG.baseUrl}/categorias`);
    }
}
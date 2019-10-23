import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CidadeDTO } from '../../models/cidade.dto';

@Injectable ()
export class CidadeService 
{
    constructor (public httpClient : HttpClient)
    {}

    findAll (estadoID : string) : Observable<CidadeDTO[]>
    {
        let url = `${API_CONFIG.baseUrl}/estados/${estadoID}/cidades`;
        return this.httpClient.get <CidadeDTO[]> (url);
    }
}
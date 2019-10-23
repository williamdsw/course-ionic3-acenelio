import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';

@Injectable ()
export class ClienteService 
{
    constructor (public httpClient : HttpClient, 
                 public storageService : StorageService)
    {}

    // Encontra pelo email
    findByEmail (email : string) : Observable<ClienteDTO>
    {
        let url = `${API_CONFIG.baseUrl}/clientes/email?value=${email}`;
        return this.httpClient.get<ClienteDTO> (url);
    }

    // Recupera imagem do bucket
    getImageFromBucket (id : string) : Observable<any>
    {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.httpClient.get (url, {'responseType' : 'blob'});
    }

    // Insere novo cliente
    insert (clienteDto : ClienteDTO)
    {
        let url = `${API_CONFIG.baseUrl}/clientes`;
        return this.httpClient.post (url, clienteDto,
        {
            observe: "response", responseType: "text"
        });
    }
}
import { ImageUtilService } from './../image-util.service';
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
                 public storageService : StorageService,
                 public imageUtilService : ImageUtilService)
    {}

    // Encontra pelo email
    findByEmail (email : string)
    {
        let url = `${API_CONFIG.baseUrl}/clientes/email?value=${email}`;
        return this.httpClient.get (url);
    }

    // Encontra pelo ID
    findByID (id : string)
    {
        let url = `${API_CONFIG.baseUrl}/clientes/${id}`;
        return this.httpClient.get (url);
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

    uploadPicture (picture)
    {
        let pictureBlob = this.imageUtilService.dataURItoBlob (picture);
        let formData : FormData = new FormData ();
        formData.set ("file", pictureBlob, "file.png");
        let url = `${API_CONFIG.baseUrl}/clientes/picture`;
        return this.httpClient.post (url, formData, 
        {
            observe: "response", responseType: "text"
        });
    }
}
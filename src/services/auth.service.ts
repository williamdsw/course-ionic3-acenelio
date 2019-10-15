import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable ()
export class AuthService 
{
    constructor (public httpClient : HttpClient)
    {}

    // Aplica um POST com dados de login
    authenticate (credeciaisDto : CredenciaisDTO)
    {
        let url = `${API_CONFIG.baseUrl}/login`;
        return this.httpClient.post (url, credeciaisDto, 
        {
            observe: "response",
            responseType: "text"
        });
    }
}
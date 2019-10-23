import { StorageService } from './storage.service';
import { LocalUser } from './../models/local-user';
import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable ()
export class AuthService 
{
    jwtHelper: JwtHelper = new JwtHelper ();

    constructor (public httpClient : HttpClient, 
                 public storageService : StorageService)
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

    // Atualiza o token
    refreshToken ()
    {
        let url = `${API_CONFIG.baseUrl}/auth/refresh_token`;
        return this.httpClient.post (url, {}, 
        {
            observe: "response",
            responseType: "text"
        });
    }

    successfulLogin (authorizationValue : string)
    {
        let newToken = authorizationValue.substring (7);
        let localUser : LocalUser = 
        {
            token: newToken,
            email: this.jwtHelper.decodeToken (newToken).sub
        };
        this.storageService.setLocalUser (localUser);
    }

    logout ()
    {
        this.storageService.setLocalUser (null);
    }
}
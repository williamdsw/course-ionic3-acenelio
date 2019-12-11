import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { PedidoDTO } from '../../models/pedido.dto';

@Injectable ()
export class PedidoService 
{
    constructor (public httpClient : HttpClient)
    {}

    insert (pedido : PedidoDTO)
    {
        let url = `${API_CONFIG.baseUrl}/pedidos`;
        return this.httpClient.post (url, pedido, 
        {
            observe: "response", responseType: "text"
        });
    }
}
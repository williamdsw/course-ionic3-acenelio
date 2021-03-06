import { Cart } from './../models/cart';
import { STORAGE_KEYS } from './../config/storage-keys.config';
import { LocalUser } from './../models/local-user';
import { Injectable } from "@angular/core";

@Injectable ()
export class StorageService
{
    getLocalUser () : LocalUser
    {
        // "localStorage" = Armazena uma string com base em Chave / Valor
        let localUser = localStorage.getItem (STORAGE_KEYS.localUser);
        if (localUser == null)
        {
            return null;
        }
        else 
        {
            return JSON.parse (localUser);
        }
    }

    setLocalUser (localUser : LocalUser) 
    {
        if (localUser == null)
        {
            localStorage.removeItem (STORAGE_KEYS.localUser);
        }
        else 
        {
            localStorage.setItem (STORAGE_KEYS.localUser, JSON.stringify (localUser));
        }
    }

    getCart () : Cart
    {
        let cart = localStorage.getItem (STORAGE_KEYS.cart);
        return (cart != null) ? JSON.parse (cart) : null;
    }

    setCart (cart : Cart)
    {
        if (cart == null) { localStorage.removeItem (STORAGE_KEYS.cart); }
        else { localStorage.setItem (STORAGE_KEYS.cart, JSON.stringify (cart)); }
    }
}
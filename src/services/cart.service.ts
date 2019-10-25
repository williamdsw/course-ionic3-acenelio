import { CartItem } from './../models/cart-item';
import { ProdutoDTO } from './../models/produto.dto';
import { Cart } from './../models/cart';
import { StorageService } from './storage.service';
import { Injectable } from "@angular/core";

@Injectable ()
export class CartService
{
    constructor (public storageService : StorageService)
    {}

    // Cria ou limpa
    createOrClearCart () : Cart
    {
        let cart : Cart = { items: [] };
        this.storageService.setCart (cart);
        return cart;
    }

    // Retorna carrinho
    getCart () : Cart 
    {
        let cart : Cart = this.storageService.getCart ();
        if (cart == null)
        {
            cart = this.createOrClearCart ();
        }
        return cart;
    }

    // Verifica e adiciona novo produto
    addProduto (produtoDto : ProdutoDTO) : Cart
    {
        let cart = this.getCart ();
        let position = cart.items.findIndex (item => item.produto.id == produtoDto.id);
        if (position == -1)
        {
            let item : CartItem =  { quantidade: 1, produto: produtoDto };
            cart.items.push (item);
        }

        this.storageService.setCart (cart);
        return cart;
    }
}
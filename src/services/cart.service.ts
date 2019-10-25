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

    // Verifica e remove o produto
    removeProduto (produtoDto : ProdutoDTO) : Cart
    {
        let cart = this.getCart ();
        let position = cart.items.findIndex (item => item.produto.id == produtoDto.id);
        if (position != -1)
        {
            cart.items.splice (position, 1);
        }
        this.storageService.setCart (cart);
        return cart;
    }

    // Verifica e incrementa quantidade
    increaseQuantity (produtoDto : ProdutoDTO) : Cart
    {
        let cart = this.getCart ();
        let position = cart.items.findIndex (item => item.produto.id == produtoDto.id);
        if (position != -1)
        {
            cart.items[position].quantidade++;
        }
        this.storageService.setCart (cart);
        return cart;
    }

    // Verifica e decrementa quantidade
    decreaseQuantity (produtoDto : ProdutoDTO) : Cart
    {
        let cart = this.getCart ();
        let position = cart.items.findIndex (item => item.produto.id == produtoDto.id);
        if (position != -1)
        {
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1)
            {
                cart = this.removeProduto (produtoDto);
            }
        }
        this.storageService.setCart (cart);
        return cart;
    }

    // Retorna valor total do carrinho
    getTotal () : number
    {
        let cart = this.getCart ();
        let sum = 0;
        cart.items.forEach (item =>
        {
            sum += item.produto.preco * item.quantidade;
        });

        return sum;
    }
}
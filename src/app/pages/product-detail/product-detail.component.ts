import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutcsService } from '../../services/produtcs.service';
import Swal from 'sweetalert2';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  cantidad = new FormControl(0);
  pedido:Pedido[] = [];
  public nombre:string | undefined;
  public imagen:string | undefined;
  public precio:number | undefined;
  public stock:number = 0;
  private lStorage = localStorage.getItem('pedido');
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private productsService: ProdutcsService) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.productsService.getProductById(`${id}`).subscribe(resp=>{
      this.nombre = resp.data()!.nombre
      this.imagen = resp.data()!.imagen
      this.precio = resp.data()!.precio
      this.stock = resp.data()!.stock
    });
    
  }
  comprar(cantidad: number){
    const itemPedido:Pedido = {
      cantidad: cantidad,
      precio: this.precio!,
      nombre: this.nombre!,
      imagen: this.imagen!
    }
    console.log(itemPedido);
    

  }
}

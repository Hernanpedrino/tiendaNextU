import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutcsService } from '../../services/produtcs.service';
import Swal from 'sweetalert2';
import { Pedido } from '../../interfaces/pedido';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  id = this.activeRoute.snapshot.paramMap.get('id');
  selector = new FormControl(0);
  pedido:Pedido[] = [];
  public nombre:string | undefined;
  public imagen:string | undefined;
  public precio:number | undefined;
  public stock:number  | undefined;
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private productsService: ProdutcsService) { }

  ngOnInit(): void {
    this.productsService.getProductById(`${this.id}`).subscribe(resp=>{
      this.nombre = resp.data()!.nombre
      this.imagen = resp.data()!.imagen
      this.precio = resp.data()!.precio
      this.stock = resp.data()!.stock
    });
    
  }
  comprar(cantidad: number){
    const ls = localStorage.getItem('pedido');
    const itemPedido:Pedido = {
      cantidad,
      precio: this.precio!,
      nombre: this.nombre!,
      imagen: this.imagen!
    }
    if (cantidad === 0) {
      Swal.fire({
        title: 'Por favor seleccione una cantidad',
        icon: 'error'
      });
      return
    } 
    if (!ls) {
      this.pedido.push(itemPedido);
      localStorage.setItem('pedido', JSON.stringify(this.pedido));
      Swal.fire('Producto agregado al carrito', '', 'success');
      const cantToUpdate = this.stock! - cantidad;
      this.productsService.updateProductById(this.id!, cantToUpdate);
      this.router.navigateByUrl('/check-out');
    } else {
      this.pedido = JSON.parse(localStorage.getItem('pedido')!);
      let count = 0;
      let index:any;
      for (const i in this.pedido) {
        if (this.pedido[i].nombre === itemPedido.nombre) {
          count --;
          index = i;
        } else {
          count ++;  
        }
      }
      if (count === this.pedido.length) {
        this.pedido.push(itemPedido);
        localStorage.setItem('pedido', JSON.stringify(this.pedido));
        Swal.fire('Producto agregado al carrito', '', 'success');
        const cantToUpdate = this.stock! - cantidad;
        this.productsService.updateProductById(this.id!, cantToUpdate);
        this.router.navigateByUrl('/check-out');
      } else {
        Swal.fire({
            title: 'Item ya seleccionado',
            text: 'Este producto ya se encuentra en el carrito. Desea agregar mas cantidad?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
          }).then((result)=>{
            if (result.isConfirmed) {
              const cantidadSumada = this.pedido[index].cantidad += itemPedido.cantidad ;
              localStorage.setItem('pedido', JSON.stringify(this.pedido));
              Swal.fire('Producto agregado', '', 'success');
              const cantToUpdate = this.stock! - cantidadSumada;
              this.productsService.updateProductById(this.id!, cantToUpdate);
              this.router.navigateByUrl('/check-out');
            } else {
              return;
            }
          });
      }
    }
    
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutcsService } from '../../services/produtcs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  pedido:any = [];
  public nombre:string | undefined;
  public imagen:string | undefined;
  public precio:number | undefined;
  public stock:number  | undefined;
  private lStorage = localStorage.getItem('pedido');
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private productsService: ProdutcsService) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.productsService.getProductById(`${id}`).subscribe(resp=>{
      this.nombre = resp.data()?.nombre
      this.imagen = resp.data()?.imagen
      this.precio = resp.data()?.precio
      this.stock = resp.data()?.stock
    });
    
  }
  comprar(cantidad: any){
    if (cantidad === 'Seleccionar cantidad') {
      Swal.fire({
        title: 'Por favor seleccione una cantidad para comprar',
        icon: 'warning'
      });
      return;
    }else{
      const id = this.activeRoute.snapshot.paramMap.get('id');
      const cantidadAactualizar = this.stock! - cantidad
      // this.productsService.updateProductById(`${id}`, cantidadAactualizar);
      const itemPedido = {
        cantidadComprada: cantidad,
        precio: this.precio,
        itemComprado: this.nombre,
        imagen: this.imagen
      }
      if(!this.lStorage) {
        this.pedido.push(itemPedido);
        localStorage.setItem('pedido', JSON.stringify(this.pedido));
        console.log(this.pedido);
      } else {
        const pedidoAlmacenado = JSON.parse(localStorage.getItem('pedido')!);
        for (let index = 0; index < pedidoAlmacenado.length; index++) {
          const element = pedidoAlmacenado[index];
          if (element.itemComprado === itemPedido.itemComprado) {
            console.log('Pedido en ccarrito');
          }
        }
        pedidoAlmacenado.push(itemPedido);
        localStorage.setItem('pedido', JSON.stringify(pedidoAlmacenado));
      }
      // this.router.navigateByUrl('/check-out');
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styles: [
  ]
})
export class CheckOutComponent implements OnInit {

  public itemsCarrito:Pedido[] = [];
  public totalPedido:number = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.obtenerPedido();
   }
  obtenerPedido(){
    const itmLs = localStorage.getItem('pedido');
    if (itmLs) {
      const arregItems = JSON.parse(itmLs);
      arregItems.forEach((item:Pedido) => {
        const total = item.precio * item.cantidad;
        this.totalPedido += total;
        this.itemsCarrito.push(item);
      });
    }
  }
  pagar(){
    Swal.fire({
      title: 'Muchas gracias por su compra',
      icon: 'success'
    })
    localStorage.removeItem('pedido');
    this.router.navigateByUrl('/home');
  }

}

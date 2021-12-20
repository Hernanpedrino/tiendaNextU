import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [
  ]
})
export class NavBarComponent implements OnInit {

  public cantidad: number = 0;
  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.itemsCarrito();
  }
  salir(){
    Swal.fire({
      title: 'Quieres salir de la tienda?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.logOut();
        this.router.navigateByUrl('/login');
        localStorage.clear();
      } else if (result.isDenied) {
        return;
      }
    })
    
  }
  itemsCarrito(){
    const ls = localStorage.getItem('pedido');
    if (ls) {
      const lsParsed = JSON.parse(ls);
      this.cantidad = lsParsed.length;
    }
    return this.cantidad;
  }

}

import { Component, OnInit } from '@angular/core';
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

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
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
      } else if (result.isDenied) {
        return;
      }
    })
    
  }

}

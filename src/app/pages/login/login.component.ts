import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.email])
  });

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.usersService.loginUser(email, password).then(resp=>{
      if (resp) {
        Swal.fire({
          title: 'Bienvenido a la tienda',
          icon: 'success'
        })
        this.router.navigateByUrl('/home');
      }
    })
  }

}

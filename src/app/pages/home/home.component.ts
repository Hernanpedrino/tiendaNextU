import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProdutcsService } from '../../services/produtcs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public items:Product[] = [];
  constructor(private productsServices: ProdutcsService) { }

  ngOnInit(): void {
    this.productsServices.getProducts().subscribe(
      resp=>{
        resp.forEach(doc=>{
          this.items.push(doc);
        })
      }
    );
  }
  buscar(termino:string){
    if (termino) {
      let productosBuscados:Product[] = [];
      termino = termino.toLowerCase();
      for (const producto of this.items) {
        let item = producto.nombre;
        if (item.indexOf(termino) >= 0) {
          productosBuscados.push(producto);
        }
      }
      this.items = productosBuscados;
      
    } else {
      this.items = [];
      this.productsServices.getProducts().subscribe(
        resp=>{
          resp.forEach(doc=>{
            this.items.push(doc);
          })
        }
      );
    }
  }

}

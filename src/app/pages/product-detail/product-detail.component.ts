import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutcsService } from '../../services/produtcs.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public nombre:string | undefined;
  public imagen:string | undefined;
  public precio:number | undefined;
  public stock:number  | undefined;
  
  constructor(private activeRoute: ActivatedRoute,
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
}
